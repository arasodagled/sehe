'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useCart } from './cart';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/#story', label: 'Our Story' },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled || menu ? ' scrolled' : ''}${pathname === '/' && !scrolled && !menu ? ' on-dark' : ''}`}>
      <div className="header-inner">
        <nav className={menu ? 'nav open' : 'nav'} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenu(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="icon-btn menu-btn" aria-label="Menu" onClick={() => setMenu(!menu)}>
          {menu ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
        </button>
        <Link href="/" className="wordmark" aria-label="SUHÉ home">
          SUHÉ
        </Link>
        <button className="basket-btn" onClick={() => setOpen(true)}>
          Basket <span>({count})</span>
        </button>
      </div>
    </header>
  );
}
