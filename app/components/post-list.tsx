import Link from 'next/link';
import { Post, formatDate } from '../../lib/substack';

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Link key={post.slug} href={`/journal/${post.slug}`} className="post-card">
          {post.image && (
            <div className="post-img">
              {/* Substack-hosted image; plain img keeps it free of image-domain config. */}
              <img src={post.image} alt="" loading="lazy" />
            </div>
          )}
          <p className="label">{formatDate(post.date)}</p>
          <h3 className="serif post-title">{post.title}</h3>
          {post.subtitle && <p className="muted post-sub">{post.subtitle}</p>}
          <span className="text-link">Read</span>
        </Link>
      ))}
    </div>
  );
}
