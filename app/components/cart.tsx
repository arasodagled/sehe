'use client';
import Image from 'next/image';
import { createContext, useContext, useEffect, useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { products, formatPrice } from '../products';

type Cart = Record<string, number>;
type CartApi = {
  cart: Cart;
  count: number;
  add: (id: string) => void;
  change: (id: string, delta: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartApi | null>(null);
const KEY = 'suhe-cart';

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (saved && typeof saved === 'object') setCart(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, ready]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const change = (id: string, delta: number) =>
    setCart((old) => {
      const next = { ...old, [id]: Math.min(10, Math.max(0, (old[id] || 0) + delta)) };
      if (!next[id]) delete next[id];
      return next;
    });

  const api: CartApi = {
    cart,
    count: Object.values(cart).reduce((a, b) => a + b, 0),
    add: (id) => {
      change(id, 1);
      setOpen(true);
    },
    change,
    clear: () => setCart({}),
    open,
    setOpen,
  };

  return (
    <CartContext.Provider value={api}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const { cart, count, change, open, setOpen } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const lines = products.filter((p) => cart[p.id] > 0);
  const total = lines.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  async function checkout() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lines.map((p) => ({ id: p.id, quantity: cart[p.id] })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout unavailable');
      window.location.assign(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout unavailable');
      setLoading(false);
    }
  }

  return (
    <div className={open ? 'drawer-wrap open' : 'drawer-wrap'} aria-hidden={!open}>
      <div className="drawer-scrim" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-label="Basket">
        <div className="drawer-head">
          <p className="label">Basket ({count})</p>
          <button className="icon-btn" aria-label="Close basket" onClick={() => setOpen(false)}>
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p className="serif">Your basket is empty.</p>
            <button className="text-link" onClick={() => setOpen(false)}>
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer-lines">
              {lines.map((p) => (
                <li key={p.id}>
                  <Image src={p.image} alt="" width={88} height={110} />
                  <div className="line-info">
                    <p className="serif line-name">{p.name}</p>
                    <p className="muted small">{p.scent.notes}</p>
                    <div className="qty">
                      <button aria-label={`Remove one ${p.name}`} onClick={() => change(p.id, -1)}>
                        <Minus size={12} />
                      </button>
                      <span>{cart[p.id]}</span>
                      <button aria-label={`Add one ${p.name}`} onClick={() => change(p.id, 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="line-price">{formatPrice(p.price * cart[p.id])}</p>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="subtotal">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="muted small">UK delivery £4.50, calculated at checkout.</p>
              {error && <p className="error small">{error}</p>}
              <button className="btn btn-dark btn-block" disabled={loading} onClick={checkout}>
                {loading ? 'Opening secure checkout…' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function AddToBasket({ id, className = 'btn btn-dark btn-block' }: { id: string; className?: string }) {
  const { add } = useCart();
  return (
    <button className={className} onClick={() => add(id)}>
      Add to basket
    </button>
  );
}

export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => clear(), []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
