import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormCard from "./FormCard";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function CardContainer() {
  return (
    <Elements stripe={stripePromise}>
      <FormCard />
    </Elements>
  );
}

export default CardContainer;
