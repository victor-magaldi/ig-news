import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import Head from "next/head";
import React from "react";
import { getPrismicClient } from "../../services/prismic";
import style from "./style.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>
      <main className={style.container}>
        <div className={style.posts}>
          <a href="#">
            <time>17 de março</time>
            <strong>Tille my post is this</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
              laudantium illo aspernatur quis incidunt adipisci debitis ullam
              amet odit ducimus magnam iusto voluptatibus officia nemo atque
              alias aut, doloribus facere. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Magnam, iure, voluptatum beatae
              architecto cumque harum explicabo recusandae, quibusdam porro
              possimus fugit nostrum tenetur earum animi itaque saepe numquam
              aliquam doloremque. Cumque reprehenderit nemo quis ut hic velit
              sunt, similique perspiciatis quasi perferendis vel labore dicta
              iste quisquam iusto cupiditate placeat quae? Repellendus magni id
              corporis rerum ipsum reprehenderit eum atque!
            </p>
          </a>
          <a href="#">
            <time>17 de março</time>
            <strong>Tille my post is this</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
              laudantium illo aspernatur quis incidunt adipisci debitis ullam
              amet odit ducimus magnam iusto voluptatibus officia nemo atque
              alias aut, doloribus facere. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Magnam, iure, voluptatum beatae
              architecto cumque harum explicabo recusandae, quibusdam porro
              possimus fugit nostrum tenetur earum animi itaque saepe numquam
              aliquam doloremque. Cumque reprehenderit nemo quis ut hic velit
              sunt, similique perspiciatis quasi perferendis vel labore dicta
              iste quisquam iusto cupiditate placeat quae? Repellendus magni id
              corporis rerum ipsum reprehenderit eum atque!
            </p>
          </a>
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
  // dica para melhorar o console log no terminal
  console.log(JSON.stringify(response, null, 2));
  return {
    props: {},
  };
};
