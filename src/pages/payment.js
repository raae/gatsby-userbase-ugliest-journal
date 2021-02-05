import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import userbase from "userbase-js";

import Header from "../components/Header";

const BASE_URL = typeof window !== `undefined` ? window.location.origin : "";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_KEY);

const PaymentPage = () => {
  useEffect(() => {
    const init = async () => {
      try {
        console.log("Init Userbase");

        await userbase.init({
          appId: process.env.GATSBY_USERBASE_APP_ID,
        });
      } catch (error) {
        console.log("Init Userbase failed", error);
      }
    };

    init();
  }, []);

  const purchaseSubscription = async (priceId) => {
    // Wait for stripe to load before continuing
    // as its needed by userbase.purchaseSubscription
    await stripePromise;

    userbase
      .purchaseSubscription({
        successUrl: `${BASE_URL}/app`,
        cancelUrl: `${BASE_URL}/app/payment`,
        priceId,
      })
      .then(() => {
        // user successfully redirected to Stripe Checkout form
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <Header title="Payment" />
      <button
        onClick={() => purchaseSubscription("price_1IADRnBFosCfKXvcf80aETbg")}
      >
        Yearly plan
      </button>
      &nbsp;
      <button
        onClick={() => purchaseSubscription("price_1IADRnBFosCfKXvcQQac90MX")}
      >
        Monthly plan
      </button>
    </div>
  );
};

export default PaymentPage;
