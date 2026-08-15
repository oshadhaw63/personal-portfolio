import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="wrap grid min-h-[60vh] place-items-start py-24">
      <div>
        <p className="text-sm text-muted">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-8 text-muted">
          That page does not exist. It may have moved, or the link may be wrong.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to home
        </Link>
      </div>
    </main>
  );
}
