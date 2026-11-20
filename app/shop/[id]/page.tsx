import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, getProduct, formatPrice, kindLabel } from '../../products';
import { AddToBasket } from '../../components/cart';
import { ProductCard } from '../../components/product-card';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = getProduct((await params).id);
  return p ? { title: p.name, description: p.scent.description } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const product = getProduct((await params).id);
  if (!product) notFound();
  const { scent } = product;
  const sibling = products.find((p) => p.scent.slug === scent.slug && p.kind !== product.kind)!;
  const others = products.filter((p) => p.kind === product.kind && p.scent.slug !== scent.slug);

  return (
    <>
      <section className="pdp page-top">
        <div className="pdp-img">
          <Image src={product.image} alt={`${product.name}, ${scent.notes}`} fill priority sizes="(max-width: 900px) 100vw, 55vw" />
        </div>
        <div className="pdp-info">
          <Link href="/shop" className="label back">
            ← Shop
          </Link>
          <p className="label pdp-mood">{scent.mood}</p>
          <h1 className="serif pdp-title">{scent.name}</h1>
          <p className="serif pdp-notes">{scent.notes}</p>
          <p className="pdp-price">{formatPrice(product.price)}</p>

          <div className="format" role="group" aria-label="Format">
            {(product.kind === 'candle' ? [product, sibling] : [sibling, product]).map((p) => (
                <Link key={p.id} href={`/shop/${p.id}`} className={p.id === product.id ? 'format-opt active' : 'format-opt'}>
                  <span>{kindLabel(p.kind)}</span>
                  <span className="muted small">{p.size}</span>
                </Link>
            ))}
          </div>

          <AddToBasket id={product.id} />

          <p className="pdp-desc">{scent.description}</p>
          <dl className="pdp-details">
            <div>
              <dt className="label">Notes</dt>
              <dd>{scent.notes}</dd>
            </div>
            <div>
              <dt className="label">Size</dt>
              <dd>{product.size}</dd>
            </div>
            <div>
              <dt className="label">Delivery</dt>
              <dd>UK delivery, £4.50</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Candle photos are landscape and suit a full-width band; mist photos are portrait. */}
      {product.kind === 'candle' && (
        <section className="pdp-photo">
          <Image src={product.photo} alt="" fill sizes="100vw" />
        </section>
      )}

      <section className="section">
        <p className="label center">You may also like</p>
        <h2 className="serif section-title center">More {product.kind === 'candle' ? 'candles' : 'room mists'}</h2>
        <div className="grid grid-3">
          {others.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
