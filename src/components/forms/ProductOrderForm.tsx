"use client";

import { useState } from "react";

interface Product {
  id: string;
  name: string;
  priceInCents: number;
}

interface PurchasePageProps {
  product: Product;
}

export default function PurchasePage({ product }: PurchasePageProps) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      // Instead of API call, directly open BML payment page in new tab
      const paymentUrl =
        "https://shop.merchants.bankofmaldives.com.mv/6905f62f4e2ff463aaa4fa9d";

      window.open(paymentUrl, "_blank");
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">Price: MVR {(product.priceInCents / 100).toFixed(2)}</p>

      <input
        type="text"
        placeholder="Your Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="mb-4 w-full p-2 border rounded"
      />

      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? "Opening Payment Page..." : "Buy Now"}
      </button>
    </div>
  );
}
