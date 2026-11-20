import Link from 'next/link';
import { ClearCart } from '../components/cart';

export default function Success() {
  return (
    <section className="result page-top">
      <ClearCart />
      <p className="label">Order received</p>
      <h1 className="serif page-title">Thank you</h1>
      <p>Your payment was submitted through Stripe. A confirmation email is on its way.</p>
      <Link href="/shop" className="text-link">
        Return to the shop
      </Link>
    </section>
  );
}
