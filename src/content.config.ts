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

export const collections = { projects };
