import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  async function stripeTokenHandler(token) {
    console.log("token inside stripe", token);
    const paymentData = { tok: token.id };
    console.log("paymentData inside stripe token handler", paymentData);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token.id }),
    };
    const response = await fetch(
      "http://localhost:8080/payment",
      requestOptions
    );
    console.log("reponse from server", response);
    const json = await response.json();

    console.log("json", json);

    return json;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("insidehandle submit");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    console.log("result of creating token", result.token);

    if (result.error) {
      console.log(result.error.message);
    } else {
      const response = await stripeTokenHandler(result.token);

      console.log("payment response", response.status);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}
