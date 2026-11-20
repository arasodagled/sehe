import Image from 'next/image';
import Link from 'next/link';
import { products, scents } from './products';
import { ProductCard } from './components/product-card';
import { PostList } from './components/post-list';
import { getPosts } from '../lib/substack';

export const revalidate = 1800;

export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);
  const candles = products.filter((p) => p.kind === 'candle');

  return (
    <>
      <section className="hero">
        <Image
          src="/images/rainfall-candle-full.webp"
          alt="SUHÉ Rainfall candle lit beside white tea and jasmine"
          fill
          priority
          sizes="100vw"
          className="hero-img"
        />
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

      <section className="section journal-teaser">
        <div className="section-head">
          <div>
            <p className="label">The journal</p>
            <h2 className="serif section-title">Notes on a calmer mind</h2>
          </div>
          <Link href="/journal" className="text-link">
            All writing
          </Link>
        </div>
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="serif journal-empty">
            Reflections on meditation, quieting the mind, and simple tools for finding peace. Coming soon.
          </p>
        )}
      </section>
    </>
  );
}
