import type { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { CartProvider } from './components/cart';
import { Header } from './components/header';
import './globals.css';

// Self-hosted variable fonts (SIL Open Font License), latin subset.
const serif = localFont({
  src: [
    { path: './fonts/cormorant.woff2', weight: '300 500', style: 'normal' },
    { path: './fonts/cormorant-italic.woff2', weight: '300 500', style: 'italic' },
  ],
  variable: '--font-serif',
});
const sans = localFont({ src: './fonts/jost.woff2', weight: '300 500', variable: '--font-sans' });

export const metadata: Metadata = {
  title: { default: 'SUHÉ — Botanical Fragrance House', template: '%s — SUHÉ' },
  description: 'Candles and room mists inspired by Colombia, made for quieter moments.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="site-footer">
            <div className="footer-top">
              <p className="wordmark footer-mark">SUHÉ</p>
              <p className="serif footer-line">Botanical fragrance for a quieter mind.</p>
            </div>
            <div className="footer-cols">
              <div>
                <p className="label">Shop</p>
                <Link href="/shop?type=candle">Candles</Link>
                <Link href="/shop?type=mist">Room Mists</Link>
                <Link href="/shop">All fragrances</Link>
              </div>
              <div>
                <p className="label">House</p>
                <Link href="/#story">Our Story</Link>
                <span>United Kingdom</span>
              </div>
            </div>
            <p className="footer-legal">© {new Date().getFullYear()} SUHÉ</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
