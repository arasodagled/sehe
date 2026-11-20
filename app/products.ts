// The single source of truth for the catalogue. Prices are in pence and are
// trusted server-side by the checkout route, so edit them here only.

export type Kind = 'candle' | 'mist';

export type Scent = {
  slug: string;
  name: string;
  notes: string;
  mood: string;
  description: string;
};

export type Product = {
  id: string;
  scent: Scent;
  kind: Kind;
  name: string;
  size: string;
  price: number;
  image: string; // 4:5 card crop
  photo: string; // full photograph
};

export const PRICES: Record<Kind, number> = {
  candle: 3800,
  mist: 2800,
};

const SIZES: Record<Kind, string> = {
  candle: '340 g · 12 oz',
  mist: '100 ml · 3.4 fl oz',
};

export const scents: Scent[] = [
  {
    slug: 'grounding',
    name: 'Grounding',
    notes: 'Cacao, Cedarwood & Vanilla',
    mood: 'Stability',
    description:
      'Roasted cacao and dry cedarwood, softened by a thread of vanilla. A steady, earthy warmth for the moments you need to come back to yourself.',
  },
  {
    slug: 'rainfall',
    name: 'Rainfall',
    notes: 'White Tea, Jasmine & Musk',
    mood: 'Peace',
    description:
      'Pale white tea and jasmine, washed clean by a tropical downpour. A soft, quiet stillness for the end of the day.',
  },
  {
    slug: 'beach-breeze',
    name: 'Beach Breeze',
    notes: 'Coconut & Lime',
    mood: 'Escape',
    description:
      'Fresh coconut and a bright twist of lime carried on a warm Caribbean breeze. Light, open and unhurried.',
  },
  {
    slug: 'bonfire',
    name: 'Bonfire',
    notes: 'Warm Woods, Amber & Tonka',
    mood: 'Comfort',
    description:
      'Smouldering woods, resinous amber and sweet tonka bean. The warmth of an evening gathered close.',
  },
];

const KIND_LABEL: Record<Kind, string> = { candle: 'Candle', mist: 'Room Mist' };

export const kindLabel = (kind: Kind) => KIND_LABEL[kind];

export const products: Product[] = scents.flatMap((scent) =>
  (['candle', 'mist'] as Kind[]).map((kind) => ({
    id: `${scent.slug}-${kind}`,
    scent,
    kind,
    name: `${scent.name} ${KIND_LABEL[kind]}`,
    size: SIZES[kind],
    price: PRICES[kind],
    image: `/images/${scent.slug}-${kind}.webp`,
    photo: `/images/${scent.slug}-${kind}-full.webp`,
  })),
);

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (pence: number) => `£${(pence / 100).toFixed(2)}`;
