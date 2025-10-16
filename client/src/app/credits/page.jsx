"use client";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

function CreditsPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPlans = async () => {
    setPlans([
      {
        _id: "12345678",
        name: "Basic",
        price: 10,
        credits: 100,
        features: [
          "100 text generations",
          "50 image generations",
          "Standard support",
          "Access to basic models",
        ],
      },
      {
        _id: "23456789",
        name: "Pro",
        price: 20,
        credits: 500,
        features: [
          "500 text generations",
          "200 image generations",
          "Priority support",
          "Access to pro models",
          "Faster response time",
        ],
      },
      {
        _id: "567890",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: [
          "1000 text generations",
          "500 image generations",
          "24/7 VIP support",
          "Access to premium models",
          "Dedicated account manager",
        ],
      },
    ]);
    setLoading(false);
  };
  useEffect(() => {
    fetchPlans();
  }, []);
  if (loading) return <Loader className="size-80 animate-spin " />;
  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-semibold mb-10 text-gray-800 dark:text-white xl:mt-32">
        Credit Plans
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <div
            className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-xs flex flex-col ${
              plan.name === "Pro"
                ? "bg-purple-50 dark:bg-purple-900"
                : "bg-white dark:bg-transparent"
            }`}
            key={plan._id}
          >
            <div className="flex-1 ">
              <h3>{plan.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreditsPage;
