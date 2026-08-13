import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9333;
const baseUrl = process.env.PORTFOLIO_TEST_URL ?? "http://127.0.0.1:3100";
const outputDirectory = path.resolve(".next", "responsive-checks");
const profileDirectory = path.resolve(".next", "chrome-responsive-profile");
const viewports = [
  { width: 375, height: 900 },
  { width: 768, height: 1000 },
  { width: 1024, height: 1100 },
  { width: 1440, height: 1100 },
];

await mkdir(outputDirectory, { recursive: true });

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDirectory}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

try {
  await waitForChrome();
  const targetResponse = await fetch(
    `http://127.0.0.1:${port}/json/new?${encodeURIComponent(baseUrl)}`,
    { method: "PUT" },
  );
  const target = await targetResponse.json();
  const client = createClient(target.webSocketDebuggerUrl);
  await client.ready;
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Log.enable");
  await client.send("Network.enable");

  let browserErrors = [];
  client.on("Runtime.exceptionThrown", (event) => {
    browserErrors.push(event.params.exceptionDetails.text);
  });
  client.on("Log.entryAdded", (event) => {
    if (event.params.entry.level === "error") browserErrors.push(event.params.entry.text);
  });
  client.on("Runtime.consoleAPICalled", (event) => {
    if (event.params.type === "error") browserErrors.push("console.error was called");
  });
  client.on("Network.loadingFailed", (event) => {
    if (!event.params.canceled) browserErrors.push(event.params.errorText);
  });

  const results = [];

  for (const viewport of viewports) {
    browserErrors = [];
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.width < 768,
    });
    await client.send("Page.navigate", { url: baseUrl });
    await waitForDocument(client);
    await new Promise((resolve) => setTimeout(resolve, 250));

    const evaluation = await client.send("Runtime.evaluate", {
      expression: `(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim(),
        menuVisible: getComputedStyle(document.querySelector('header button[aria-controls="mobile-nav"]')).display !== 'none'
      }))()`,
      returnByValue: true,
    });
    const metrics = evaluation.result.result.value;
    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false,
    });
    const screenshotPath = path.join(outputDirectory, `home-${viewport.width}.png`);
    await writeFile(screenshotPath, Buffer.from(screenshot.result.data, "base64"));

    results.push({
      requestedWidth: viewport.width,
      ...metrics,
      horizontalOverflow: metrics.scrollWidth > metrics.innerWidth,
      browserErrors,
      screenshot: screenshotPath,
    });
  }

  client.close();
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);

  if (results.some((result) => result.horizontalOverflow || result.innerWidth !== result.requestedWidth || result.browserErrors.length > 0)) {
    process.exitCode = 1;
  }
} finally {
  chrome.kill();
}

async function waitForChrome() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome may need a moment to expose the debugging endpoint.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Chrome DevTools endpoint did not become ready.");
}

async function waitForDocument(client) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const response = await client.send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    });
    if (response.result.result.value === "complete") return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Page did not finish loading.");
}

function createClient(url) {
  const socket = new WebSocket(url);
  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) {
      for (const listener of listeners.get(message.method) ?? []) listener(message);
      return;
    }
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message);
  });

  return {
    ready: new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    }),
    send(method, params = {}) {
      const id = nextId;
      nextId += 1;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    close() {
      socket.close();
    },
    on(method, listener) {
      const methodListeners = listeners.get(method) ?? [];
      methodListeners.push(listener);
      listeners.set(method, methodListeners);
    },
  };
}
