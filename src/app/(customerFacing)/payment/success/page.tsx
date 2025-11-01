"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("order_id");

  useEffect(() => {
    if (orderId) {
      fetch("/api/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-700">✅ Payment Successful</h1>
      <p className="mt-4 text-gray-700">Thank you! Your order has been received.</p>
    </div>
  );
}
