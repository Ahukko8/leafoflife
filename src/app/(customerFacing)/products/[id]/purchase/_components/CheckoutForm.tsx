"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { formatCurrency } from "@/lib/formatters";

type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret?: string;
};

export function CheckoutForm({ product }: CheckoutFormProps) {
  return (
    <div className="mt-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative aspect-video w-full md:w-1/2 rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-contain"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold text-[#3E3C37]">{product.name}</h1>
          <p className="text-sm text-muted-foreground text-justify">{product.description}</p>
          <p className="text-lg font-semibold text-[#3E3C37]">
            {formatCurrency(product.priceInCents)}{" "}
            <span className="text-sm text-muted-foreground">(per item)</span>
          </p>
          <span className="text-sm text-muted-foreground text-red-500 italic">
            (*Shipping cost and other charges will apply*)
          </span>
        </div>
      </div>

      <Form
        productName={product.name}
        priceInCents={product.priceInCents}
        productId={product.id}
      />
    </div>
  );
}

function Form({
  priceInCents,
  productId,
  productName,
}: {
  priceInCents: number;
  productId: string;
  productName: string;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();

  // Quantity is string to allow empty input
  const [formData, setFormData] = useState({
    customerName: "",
    productName,
    productId,
    priceInCents,
    quantity: "1",
    email: "",
    message: "",
    phone: "",
  });

  const quantityNumber = Number(formData.quantity);
  const totalPrice = quantityNumber > 0 ? priceInCents * quantityNumber : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      // Prepare data for submission, quantity as number >= 0
      const quantityNum = Number(formData.quantity);
      const submitData = {
        ...formData,
        quantity: quantityNum > 0 ? quantityNum : 0,
      };

      const response = await fetch("/api/sendProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast({
          description:
            "Your order has been sent. We will contact you shortly!",
          className: "border-green-600",
        });
        // Reset form (quantity back to "1")
        setFormData({
          customerName: "",
          productName,
          productId,
          priceInCents,
          quantity: "1",
          email: "",
          message: "",
          phone: "",
        });
        router.push("/products");
      } else {
        setErrorMessage("Failed to submit the order.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Restrict phone input to digits and plus sign
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^\d+]/g, "");
    setFormData((prev) => ({ ...prev, phone: onlyNums }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#3E3C37]">Place Order</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Fill in your information to place the order. We&#39;ll contact you
            for confirmation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Customer Name
              </label>
              <Input
                id="customerName"
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                name="quantity"
                min={0}
                value={formData.quantity}
                onChange={handleChange}
                onKeyDown={(e) => {
                  // Prevent invalid keys like e, +, -
                  if (["e", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            <div>
              <label
                htmlFor="totalPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Total Price
              </label>
              <Input
                id="totalPrice"
                readOnly
                value={formatCurrency(totalPrice)}
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                required
                pattern="^\+?([0-9]{1,3})?[-.\s]?([0-9]{6,14})$"
                placeholder="+960 000 0000"
                value={formData.phone}
                onChange={handlePhoneInput}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
            >
              {isLoading ? "SENDING..." : "SEND ORDER"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
