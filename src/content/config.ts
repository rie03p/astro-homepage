import { z, defineCollection } from "astro:content";

const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    stack: z.array(z.string()),
    website: z.string().optional(),
    github: z.string(),
  }),
});

export const collections = {
  post: postCollection,
  projects: projectCollection,
};
