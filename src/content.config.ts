import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    period: z.string(),
    summary: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    source: z.string(),
    todos: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(true),
    publishedAt: z.coerce.date().optional(),
  }).refine(post => post.draft || !!post.publishedAt, {
    message: 'Published posts require a publishedAt date.',
  }),
});

export const collections = { projects, blog };
