import { GetStaticPaths, GetStaticProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { RichText } from "prismic-dom";
import React from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";

type PreviewPost = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};
interface PreviewProps {
  post: PreviewPost;
}

export default function Preview({ post }: PreviewProps) {
  return (
    <>
      <Head>
        <title>{post?.title}|IgNews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post?.title}</h1>
          <time>{post?.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent} `}
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </article>
      </main>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID("posts", String(slug), {});

  const dateFormated = new Date(
    response?.last_publication_date
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 2)),
    updatedAt: dateFormated,
  };
  return {
    props: { post },
  };
};