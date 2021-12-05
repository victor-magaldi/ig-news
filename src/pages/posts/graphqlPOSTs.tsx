import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import Head from "next/head";
import React from "react";
import style from "./style.module.scss";
import { client } from "../../services/apolloClient";
import gql from "graphql-tag";
import { newclient } from "../../services/newApolloClient";
import { useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query getAllPosts {
    allPostss {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`;
export default function Posts() {
  //------------------------------com apollo-client
  client
    .query({ query: GET_POSTS })
    .then((r) => {
      console.log("resposta com com apollo-client ", r);
    })
    .catch((err) => console.log("error", err));
  //------------------------------------------------------com apollo-client
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&com @apollo/client
  const { loading, error, data } = useQuery(GET_POSTS, {
    client: newclient,
  });
  console.log("resposta com com @apollo/client", loading, error, data);
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& com @apollo/client
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
