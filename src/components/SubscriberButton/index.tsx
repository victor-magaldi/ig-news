import React from "react";
import style from "./style.module.scss";

interface SubscriberButtonProps {
  priceId: string;
}

export function SubscriberButton({ priceId }: SubscriberButtonProps) {
  return (
    <button type="button" className={style.subscriberButton}>
      Subscribe Now
    </button>
  );
}
