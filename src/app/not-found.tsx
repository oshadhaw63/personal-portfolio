import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="wrap grid min-h-[65vh] place-items-start py-24">
      <div>
        <p className="eyebrow">
          <span className="eyebrow-num">404</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          <span>Not found</span>
        </p>
        <h1 className="heading-lg mt-6">
          This page is <span className="serif text-accent">missing.</span>
        </h1>
        <p className="lede mt-6 max-w-md">That page does not exist. It may have moved, or the link may be wrong.</p>
        <Link href="/" className="pill pill-solid mt-9">
          Back to home
        </Link>
      </div>
    </main>
  );
}
