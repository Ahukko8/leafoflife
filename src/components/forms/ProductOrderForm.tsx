"use client";

import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { toast } from "sonner";

export default function ProductOrderForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    reference: "",
    amount: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/sendProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: form.amount,
          reference: form.reference || `REF-${Date.now()}`,
          customerEmail: form.email,
          customerName: form.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("BML Error:", data);
        toast.error(data.error || "Payment failed to initialize");
      } else if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        toast.error("No redirect URL from BML Gateway");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Place Your Order
      </h2>

      <div>
        <label className="block text-sm text-gray-600">Full Name</label>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Email Address</label>
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Amount (MVR)</label>
        <Input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Reference (optional)</label>
        <Input
          name="reference"
          value={form.reference}
          onChange={handleChange}
          placeholder="Auto-generated if empty"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Notes (optional)</label>
        <Textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any special instructions..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white"
      >
        {loading ? "Redirecting to BML..." : "Proceed to Pay"}
      </Button>
    </form>
  );
}
