import style from "../styles/home.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ig.News - Home</title>
      </Head>
      <h1 className={style.title}>Hello World</h1>
    </>
  );
}
