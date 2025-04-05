import React, { useState } from "react";

const plans = [
  {
    name: "Basic",
    price: "$99/month",
    description: "Perfect for casual explorers who love discovering new places and reading community stories.",
    features: [
      "✔️ Access to travel blogs",
      "✔️ Community-shared stories",
      "✔️ Monthly travel newsletter",
      "✔️ Bookmark favorite places",
    ],
    bgColor: "bg-white",
    borderColor: "border-gray-300",
    buttonColor: "bg-[#85A947] text-white",
  },
  {
    name: "Premium",
    price: "$199/month",
    description: "Great for avid travelers looking for curated recommendations and expert insights.",
    features: [
      "✔️ Everything in Basic",
      "✔️ Curated destination lists",
      "✔️ Access to premium travel guides",
      "✔️ Early access to travel webinars",
      "✔️ Custom packing checklist tool",
    ],
    bgColor: "bg-[#85A947]",
    borderColor: "border-[#85A947]",
    textColor: "text-white",
    buttonColor: "bg-white text-[#85A947]",
    popular: true,
  },
  {
    name: "Ultimate",
    price: "$399/month",
    description: "For adventurers who want fully personalized experiences and priority support.",
    features: [
      "✔️ Everything in Premium",
      "✔️ Personalized travel itineraries",
      "✔️ 1-on-1 travel consultation (monthly)",
      "✔️ VIP community access",
      "✔️ 24/7 travel support",
    ],
    bgColor: "bg-white",
    borderColor: "border-gray-300",
    buttonColor: "bg-[#85A947] text-white",
  },
];

export default function SubscriptionPlans() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  const handlePayment = () => {
    alert("Payment submitted successfully!");
    closeModal();
  };

  return (
    <section className="py-20 px-6 bg-[#F0F0D7]">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Whether you’re an occasional traveler or a full-time adventurer, we’ve got a plan designed for your journey.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative rounded-3xl p-10 min-h-[550px] flex flex-col justify-between border ${plan.borderColor} shadow-xl ${plan.bgColor} ${plan.textColor || "text-gray-800"}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 text-sm bg-yellow-400 text-black font-semibold py-2 rounded-t-3xl">
                🌟 Most Popular
              </div>
            )}
            <div>
              <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
              <p className="text-2xl mb-4 font-semibold">{plan.price}</p>
              <p className="text-sm mb-6">{plan.description}</p>
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => openModal(plan)}
              className={`mt-10 py-3 px-6 rounded-full font-semibold hover:opacity-90 transition ${plan.buttonColor}`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedPlan && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg relative">
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
      >
        ×
      </button>

      <h3 className="text-2xl font-bold mb-2 text-center">
        {selectedPlan.name} Plan Payment
      </h3>
      <p className="text-center text-gray-600 mb-6">{selectedPlan.price}</p>

      {/* Floating Label Input Group */}
      <div className="space-y-5">
        <div className="relative">
          <label className="absolute text-sm text-gray-500 left-4 top-2.5 bg-white px-1">
            Cardholder Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-[#85A947]"
          />
        </div>

        <div className="relative">
          <label className="absolute text-sm text-gray-500 left-4 top-2.5 bg-white px-1">
            Card Number
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-[#85A947]"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative w-1/2">
            <label className="absolute text-sm text-gray-500 left-4 top-2.5 bg-white px-1">
              Expiry (MM/YY)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-[#85A947]"
            />
          </div>

          <div className="relative w-1/2">
            <label className="absolute text-sm text-gray-500 left-4 top-2.5 bg-white px-1">
              CVV
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-[#85A947]"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-[#85A947] text-white font-semibold py-3 rounded-xl hover:bg-[#6f8b3b] transition"
      >
        Pay Now
      </button>
    </div>
  </div>
  
)}
<section className="bg-[#F0F0D7] px-6 py-14 border-t border-gray-200">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">
      Frequently Asked Questions
    </h2>

    <div className="space-y-4">
      {/* FAQ 1 */}
      <div>
        <h3 className="text-base font-semibold text-[#85A947] mb-1">
          What is included in the Basic plan?
        </h3>
        <p className="text-sm text-[#333] leading-relaxed">
          The Basic plan includes access to travel blogs, community stories, monthly newsletters, and the ability to bookmark your favorite destinations.
        </p>
      </div>

      {/* FAQ 2 */}
      <div>
        <h3 className="text-base font-semibold text-[#85A947] mb-1">
          Can I upgrade or downgrade my plan anytime?
        </h3>
        <p className="text-sm text-[#333] leading-relaxed">
          Yes, you can switch between plans anytime from your account settings. The changes will reflect in your next billing cycle.
        </p>
      </div>

      {/* FAQ 3 */}
      <div>
        <h3 className="text-base font-semibold text-[#85A947] mb-1">
          Is there a free trial available?
        </h3>
        <p className="text-sm text-[#333] leading-relaxed">
          Yes, we offer a 7-day free trial for all plans. You can explore features and decide what fits your travel needs best.
        </p>
      </div>

      {/* FAQ 4 */}
      <div>
        <h3 className="text-base font-semibold text-[#85A947] mb-1">
          How secure is my payment information?
        </h3>
        <p className="text-sm text-[#333] leading-relaxed">
          We use industry-standard encryption and a trusted payment gateway to ensure your data is safe and secure.
        </p>
      </div>
    </div>
  </div>
</section>



    </section>
  );
}