import type { APIRoute } from 'astro';
import profile from '../content/profile.json';
import { publishedPosts, postUrl } from '../lib/posts';
import { escapeXml as xml } from '../lib/xml';

export const GET: APIRoute = async ({ site }) => {
  const items = (await publishedPosts()).map(post => {
    const url = xml(new URL(postUrl(post), site).href);
    return `<item><title>${xml(post.data.title)}</title><description>${xml(post.data.description)}</description><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${post.data.publishedAt!.toUTCString()}</pubDate></item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(profile.name)} — Blog</title><description>Writing by ${xml(profile.name)}.</description><link>${new URL('/blog/', site).href}</link><language>en-us</language><atom:link href="${new URL('/rss.xml', site).href}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
