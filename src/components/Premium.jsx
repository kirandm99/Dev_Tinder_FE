import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true },
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    //open razorpay dialoge box

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect one developer to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: async function (response) {
        const res = await axios.post(
          BASE_URL + "/payment/verify",
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          },
          {
            withCredentials: true,
          },
        );

        if (res.data.isPremium) {
          setIsUserPremium(true);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    "You Are Already Premium User"
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- 100 Connection request per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("Silver")}
          >
            Buy Now
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- Infinite Connection request per day</li>
            <li>- Blue Tick</li>
            <li>- 6 months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("Gold")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
