import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51I570NLDsrIZdeeLSHMRxbAZTWPNBUCQuXpP2NxnZVz3uVlnbnZe5TUGpd6OgtPMbNqm6OKOdG46faZqaKVya0qA003X3b4ali"
);

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
