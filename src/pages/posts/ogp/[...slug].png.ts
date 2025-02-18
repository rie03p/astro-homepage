import { generateBlogPostOgpImage } from "@/utils/ogp";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  const posts = await getCollection("post");
  const post = posts.find((post) => post.slug === slug);
  
  const title = post?.data.title;
  const image = await generateBlogPostOgpImage(title!);

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
    },
  })
}

export async function getStaticPaths() {
  const posts = await getCollection("post");
  return posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    }
  })

}
