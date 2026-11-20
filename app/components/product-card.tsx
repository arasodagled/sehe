import Image from 'next/image';
import Link from 'next/link';
import { Product, formatPrice, kindLabel } from '../products';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/shop/${product.id}`} className="card">
      <div className="card-img">
        <Image
          src={product.image}
          alt={`${product.name}, ${product.scent.notes}`}
          fill
          sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
          priority={priority}
        />
      </div>
      <p className="label card-mood">{product.scent.mood}</p>
      <h3 className="serif card-name">{product.scent.name}</h3>
      <p className="card-meta">
        <span>{kindLabel(product.kind)}</span>
        <span>{formatPrice(product.price)}</span>
      </p>
    </Link>
  );
}
