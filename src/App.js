import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { SessionUrl } from "./Config/Config";

const stripePromise = loadStripe(
  "pk_test_51I570NLDsrIZdeeLSHMRxbAZTWPNBUCQuXpP2NxnZVz3uVlnbnZe5TUGpd6OgtPMbNqm6OKOdG46faZqaKVya0qA003X3b4ali"
);

export default function App() {
  const handleClick = async (event) => {
    const stripe = await stripePromise;

    console.log("stripe", stripe);

    const response = await fetch(SessionUrl + "/create-checkout-session", {
      method: "POST",
    });
    console.log("response", response);

    const session = await response.json();

    console.log("session", session);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    console.log("result", result);

    if (result.error) {
      console.log(result.error.message);
    }
  };
  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
}
