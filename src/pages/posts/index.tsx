import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import Head from "next/head";
import React from "react";
import { getPrismicClient } from "../../services/prismic";
import style from "./style.module.scss";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};
interface PostProps {
  posts: Post[];
}
export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>
      <main className={style.container}>
        <div className={style.posts}>
          {posts.map((post: Post) => {
            return (
              <a href={`/${post.slug}`} key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                {post.excerpt}
              </a>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    Prismic.Predicates.at("document.type", "posts"),
    {
      fetch: ["posts.title", "posts.content"],
      pageSize: 100,
    }
  );

  const posts = response.results.map((post) => {
    const dateFormated = new Date(
      post?.last_publication_date
    ).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: dateFormated,
    };
  });
  // dica para melhorar o console log no terminal
  // console.log(JSON.stringify(response, null, 2));
  return {
    props: { posts },
  };
};
