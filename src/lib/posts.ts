import { getCollection, type CollectionEntry } from 'astro:content';

export async function publishedPosts() {
  return (await getCollection('blog', ({ data }) =>
    !data.draft && !!data.publishedAt && data.publishedAt <= new Date()
  )).sort((a, b) => b.data.publishedAt!.getTime() - a.data.publishedAt!.getTime());
}

export async function visiblePosts() {
  const posts = await publishedPosts();
  if (!import.meta.env.DEV) return posts;
  return [...posts, ...await getCollection('blog', ({ data }) => data.draft)];
}

export function postUrl(post: CollectionEntry<'blog'>) {
  return `/blog/${post.id.split('/').map(encodeURIComponent).join('/')}/`;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
