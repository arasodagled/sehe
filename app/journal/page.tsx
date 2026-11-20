import type { Metadata } from 'next';
import { getPosts, SUBSTACK_URL } from '../../lib/substack';
import { PostList } from '../components/post-list';

export const revalidate = 1800;
export const metadata: Metadata = {
  title: 'Journal',
  description: 'Writing on meditation, calming the mind, and tools for finding peace.',
};

export default async function Journal() {
  const posts = await getPosts();
  return (
    <section className="section page-top">
      <p className="label center">The journal</p>
      <h1 className="serif page-title center">Notes on a calmer mind</h1>
      <p className="journal-intro center">
        Reflections on meditation, quieting the mind, and simple tools to bring a little more peace into everyday life.
      </p>
      {SUBSTACK_URL && (
        <p className="center">
          <a className="btn btn-outline" href={`${SUBSTACK_URL}/subscribe`} target="_blank" rel="noopener noreferrer">
            Subscribe for new posts
          </a>
        </p>
      )}
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="serif journal-empty center">The first entries are on their way.</p>
      )}
    </section>
  );
}
