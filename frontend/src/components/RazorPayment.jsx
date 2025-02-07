import { useEffect } from "react";
import axios from "axios";

const RazorpayPayment = ({ amount }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please refresh and try again.");
      return;
    }

    const { data } = await axios.post("/api/v1/payment/create-order", {
      amount,
      currency: "INR",
    });

    const options = {
      key: "rzp_test_ZF9TzfhKAauAQK",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "BillCraft",
      description: "Test Transaction",
      image: "/space.jpg",
      handler: function () {
        alert("Payment Successful!");
        window.location.reload();
      },
      theme: { color: "#3399cc" },
      method: { upi: true },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-gradient-to-tl from-gray-900 to-lime-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-lime-800 hover:to-lime-900 transition-all duration-300"
    >
      Premium
    </button>
  );
};

export default RazorpayPayment;
