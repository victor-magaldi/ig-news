import { signIn, useSession } from "next-auth/client";
import React from "react";
import style from "./style.module.scss";

interface SubscriberButtonProps {
  priceId: string;
}

export function SubscriberButton({ priceId }: SubscriberButtonProps) {
  const [session] = useSession();
  function handleSubmit(e) {
    if (!session) {
      signIn("github");
      return;
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
