import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';

// Set SUBSTACK_URL in Vercel, e.g. https://yourname.substack.com
export const SUBSTACK_URL = (process.env.SUBSTACK_URL || '').replace(/\/+$/, '');

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  link: string;
  image?: string;
  html: string;
};

const text = (v: unknown): string => {
  if (v == null) return '';
  if (typeof v === 'object' && '#text' in (v as Record<string, unknown>)) {
    return String((v as Record<string, unknown>)['#text']);
  }
  return String(v);
};

function slugFrom(link: string, title: string) {
  const match = link.match(/\/p\/([^/?#]+)/);
  if (match) return match[1];
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function clean(html: string) {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'picture', 'source']),
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height'],
      source: ['srcset', 'type', 'sizes'],
    },
    allowedSchemes: ['https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer' } }),
    },
    // Drop Substack's subscribe/share widgets and empty buttons.
    exclusiveFilter: (frame) =>
      /subscription-widget|subscribe-widget|share-dialog|button-wrapper|captioned-button/.test(frame.attribs?.class || ''),
  });
}

export async function getPosts(): Promise<Post[]> {
  if (!SUBSTACK_URL) return [];
  try {
    const res = await fetch(`${SUBSTACK_URL}/feed`, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
    const data = parser.parse(xml);
    const raw = data?.rss?.channel?.item;
    const items: Record<string, unknown>[] = Array.isArray(raw) ? raw : raw ? [raw] : [];
    return items.map((item) => {
      const title = text(item.title);
      const link = text(item.link);
      const enclosure = item.enclosure as Record<string, string> | undefined;
      return {
        slug: slugFrom(link, title),
        title,
        subtitle: text(item.description),
        date: text(item.pubDate),
        link,
        image: enclosure?.['@_url'],
        html: clean(text(item['content:encoded'])),
      };
    });
  } catch (error) {
    console.error('Substack feed error', error);
    return [];
  }
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

export const formatDate = (date: string) => {
  const d = new Date(date);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
