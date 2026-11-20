import Image from 'next/image';
import Link from 'next/link';
import { products, scents } from './products';
import { ProductCard } from './components/product-card';

export default function Home() {
  const candles = products.filter((p) => p.kind === 'candle');

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="label">Botanical fragrance house</p>
          <h1 className="serif">
            Rituals for
            <br />a quieter mind
          </h1>
          <p className="hero-sub">Candles and room mists inspired by Colombia, made for the moments you return to yourself.</p>
          <Link href="/shop" className="btn btn-dark">
            Discover the collection
          </Link>
        </div>
        <div className="hero-art">
          <Image
            src="/images/hero-duo.webp"
            alt="SUHÉ Rainfall candle and room mist"
            width={768}
            height={950}
            priority
            sizes="(max-width: 900px) 80vw, 40vw"
          />
        </div>
      </section>

      <section className="section moods">
        <p className="label center">Choose by feeling</p>
        <h2 className="serif section-title center">Four fragrances, four states of mind</h2>
        <div className="mood-grid">
          {scents.map((s) => (
            <Link key={s.slug} href={`/shop/${s.slug}-candle`} className="mood">
              <span className="mood-word serif">{s.mood}</span>
              <span className="mood-name">{s.name}</span>
              <span className="muted small">{s.notes}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="label">The collection</p>
            <h2 className="serif section-title">Candles</h2>
          </div>
          <Link href="/shop" className="text-link">
            Shop all, including room mists
          </Link>
        </div>
        <div className="grid">
          {candles.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="story" className="story">
        <div className="story-img">
          <Image src="/images/grounding-mist.webp" alt="SUHÉ Grounding room mist with cacao pod and cedarwood" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="story-copy">
          <p className="label">Our story</p>
          <h2 className="serif section-title">A Colombian soul, a British home</h2>
          <p>
            SUHÉ is an independent fragrance house inspired by the landscapes of Colombia: cacao farms in the hills, rain over the
            cloud forest, warm evenings on the Caribbean coast.
          </p>
          <p>
            Each fragrance is paired with a feeling. Light a candle or mist a room as a small signal to slow down, breathe, and
            return to the present.
          </p>
        </div>
      </section>

    </>
  );
}
