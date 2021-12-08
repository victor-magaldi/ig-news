import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { api } from "../../services/api";
import { getSripeJs } from "../../services/stripe-js";
import style from "./style.module.scss";

interface SubscriberButtonProps {
  priceId: string;
}

export function SubscriberButton({ priceId }: SubscriberButtonProps) {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubmit(e) {
    if (!session) {
      signIn("github");
      return;
    }
    console.log("victorrrrrr", session?.activeSubscription);
    if (session?.activeSubscription) {
      router.push("/posts");
      return;
    }
    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;

      const stripe = await getSripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <button
      type="button"
      onClick={handleSubmit}
      className={style.subscriberButton}
    >
      Subscribe Now
    </button>
  );
}
