import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPost, formatDate, SUBSTACK_URL } from '../../../lib/substack';

export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.title, description: post.subtitle } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="article page-top">
      <Link href="/journal" className="label back">
        ← Journal
      </Link>
      <p className="label article-date">{formatDate(post.date)}</p>
      <h1 className="serif article-title">{post.title}</h1>
      {post.subtitle && <p className="serif article-sub">{post.subtitle}</p>}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className="article-foot">
        <a className="btn btn-outline" href={post.link} target="_blank" rel="noopener noreferrer">
          Read and comment on Substack
        </a>
        {SUBSTACK_URL && (
          <a className="btn btn-dark" href={`${SUBSTACK_URL}/subscribe`} target="_blank" rel="noopener noreferrer">
            Subscribe
          </a>
        )}
      </div>
    </article>
  );
}
