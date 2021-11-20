import Head from "next/head";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>ig.News - Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>✌️ Hey, Wellcome</span>
          <h1>
            News About the <span>React</span> World
          </h1>
          <p>
            Get Access to all the publication
            <br />
            <span>for $9.90 month</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}
