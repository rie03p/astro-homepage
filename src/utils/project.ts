import { getCollection, type CollectionEntry } from "astro:content";

export const getAllProjects = async (): Promise<Array<CollectionEntry<"projects">>> => {
  return await getCollection("projects");
};
