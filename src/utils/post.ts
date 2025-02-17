import { getCollection, type CollectionEntry } from "astro:content";

export const getAllPosts = async (): Promise<Array<CollectionEntry<"post">>> => {
  const posts = await getCollection("post");
  // id: post-1.mdを除く
  // return posts.filter(post => post.id !== "post-1.md");
  return posts;
};

export const getAllTags = (posts: CollectionEntry<"post">[]) => {
  return posts.flatMap(post => [...post.data.tags]);
};

export const getUniqueTags = (posts: CollectionEntry<"post">[]) => {
  return [...new Set(getAllTags(posts))];
};

export const sortPostsByDate = (posts: Array<CollectionEntry<"post">>): Array<CollectionEntry<"post">> => {
  return posts.sort((a, b) => {
    return new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime();
  });
};

export const getUniqueTagsWithCount = (posts: CollectionEntry<"post">[]): [string, number][] => {
  return [...getAllTags(posts).reduce((acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1), new Map<string, number>())].sort(
    (a, b) => b[1] - a[1]
  );
};
