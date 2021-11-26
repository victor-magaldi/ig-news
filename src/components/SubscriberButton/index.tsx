import { signIn, useSession } from "next-auth/client";
import React from "react";
import { api } from "../../services/api";
import { getSripeJs } from "../../services/stripe-js";
import style from "./style.module.scss";

interface SubscriberButtonProps {
  priceId: string;
}

export function SubscriberButton({ priceId }: SubscriberButtonProps) {
  const [session] = useSession();
  async function handleSubmit(e) {
    if (!session) {
      signIn("github");
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
