import Link from 'next/link';

export default function Cancel() {
  return (
    <section className="result page-top">
      <p className="label">Checkout cancelled</p>
      <h1 className="serif page-title">No order was placed</h1>
      <p>Your basket has been saved for whenever you&apos;re ready.</p>
      <Link href="/shop" className="text-link">
        Return to the shop
      </Link>
    </section>
  );
}
