"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { formatCurrency } from "@/src/lib/formatters";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Textarea } from "@/src/components/ui/textarea";
import PhoneInput from "react-phone-input-2";
import { Input } from "@/src/components/ui/input";


type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">{formatCurrency(product.priceInCents)}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <Form priceInCents={product.priceInCents} productId={product.id} />
    </div>
  );
}

function Form({
  priceInCents,
  productId,
}: {
  priceInCents: number;
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  // const [email, setEmail] = useState<string>();
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    productName: "",
    email: "",
    message: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sendProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Thank you! We have received your product request. We will contact you for confirmation as soon as possible!");
        setFormData({
          customerName: "",
          productName: "",
          email: "",
          message: "",
          phone: "",
        });
      } else {
        setStatus("Failed to submit the product request.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="mb-5"></div>
          <h3 className="text-muted-foreground">
            Please fill the below information to send your order to our telegram
            bot. We will contact you as soon as possible for your order
            confirmation.
          </h3>
          <div className="mt-4">
            <div className="p-5">
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Name
              </label>
              <Input
                onChange={handleChange}
                id="customerName"
                name="customerName"
                required
                className="mt-1"
                value={formData.customerName}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <Input
                onChange={handleChange}
                id="productName"
                name="productName"
                required
                className="mt-1"
                value={formData.productName}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                required
                className="mt-1"
                value={formData.email}
              />
            </div>
            <div className="p-5">
              {/* <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label> */}
              <PhoneInput
                country="mv"
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                placeholder="+960 000 0000"
                inputProps={{
                  className: "flex flex-row ml-10 w-[93%] h-9 rounded-md",
                }}
              />
            </div>
            {/* <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message your treatment details
              </label>
              <Textarea
                onChange={handleChange}
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1"
                value={formData.message}
              />
            </div> */}
            <Button className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "SENDING..." : "SEND ORDER"}
            </Button>
            {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </form>
  );
}
