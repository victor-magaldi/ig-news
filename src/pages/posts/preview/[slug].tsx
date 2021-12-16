import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { RichText } from "prismic-dom";
import React, { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

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
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    router;
    if (!session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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

          <div className={styles.continuousReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe Now 😎</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    //se quiser gerar as páginas estáticas em tempo de build, só colocar elas dentod do array path
    // paths: [{ params: { slug: "what-makes-a-man" } }],

    //fazendo da forma abaixo o server só vai gerar a página estática depois do primeiro acesso
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
    revalidate: 60 * 60 * 200,
  };
};
