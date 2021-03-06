import Head from "next/head";
import { GetStaticProps } from "next";

import { SubscriberButton } from "../components/SubscriberButton";
import styles from "./home.module.scss";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
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
            <span>for {product.amount} month</span>
          </p>
          <SubscriberButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  // expand faz com que consiga todos os outros dados do produto
  const price = await stripe.prices.retrieve("price_1JyOpKHZlUJYmkb8GPFgnfFD", {
    expand: ["product"],
  });
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };
  return {
    props: { product },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
