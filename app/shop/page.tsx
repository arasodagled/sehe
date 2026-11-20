import Link from 'next/link';
import type { Metadata } from 'next';
import { products, Kind } from '../products';
import { ProductCard } from '../components/product-card';

export const metadata: Metadata = { title: 'Shop' };

const filters: { value?: Kind; label: string }[] = [
  { label: 'All' },
  { value: 'candle', label: 'Candles' },
  { value: 'mist', label: 'Room Mists' },
];

export default async function Shop({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const active = type === 'candle' || type === 'mist' ? type : undefined;
  const list = active ? products.filter((p) => p.kind === active) : products;

  return (
    <section className="section page-top">
      <p className="label center">The collection</p>
      <h1 className="serif page-title center">Shop</h1>
      <nav className="filters" aria-label="Filter products">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.value ? `/shop?type=${f.value}` : '/shop'}
            className={active === f.value ? 'filter active' : 'filter'}
            scroll={false}
          >
            {f.label}
          </Link>
        ))}
      </nav>
      <div className="grid">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}
