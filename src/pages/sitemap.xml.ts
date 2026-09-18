import type { APIRoute } from 'astro';
import { publishedPosts, postUrl } from '../lib/posts';
import { escapeXml as xml } from '../lib/xml';

export const GET: APIRoute = async ({ site }) => {
  const paths = ['/', '/projects/', '/blog/', ...(await publishedPosts()).map(postUrl)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${xml(new URL(path, site).href)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
