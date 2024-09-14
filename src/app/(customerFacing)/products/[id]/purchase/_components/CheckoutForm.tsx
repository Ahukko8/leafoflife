// "use client";
// import { Button } from "@/src/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";
// import { formatCurrency } from "@/lib/formatters";
// import Image from "next/image";
// import { loadStripe } from "@stripe/stripe-js";
// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import { Input } from "@/src/components/ui/input";

// type CheckoutFormProps = {
//   product: {
//     id: string;
//     imagePath: string;
//     name: string;
//     priceInCents: number;
//     description: string;
//   };
//   clientSecret: string;
// };

// // const stripePromise = loadStripe(
// //   process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
// // );

// export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
//   return (
//     <div className="max-w-5xl w-full mx-auto space-y-8">
//       <div className="flex gap-4 items-center">
//         <div className="aspect-video flex-shrink-0 w-1/3 relative">
//           <Image
//             src={product.imagePath}
//             fill
//             alt={product.name}
//             className="object-contain"
//           />
//         </div>
//         <div>
//           <div className="text-lg">{formatCurrency(product.priceInCents)}</div>
//           <h1 className="text-2xl font-bold">{product.name}</h1>
//           <div className="line-clamp-3 text-muted-foreground">
//             {product.description}
//           </div>
//         </div>
//       </div>
//       <Form
//         productName={product.name}
//         priceInCents={product.priceInCents}
//         productId={product.id}
//       />
//     </div>
//   );
// }

// function Form({
//   priceInCents,
//   productId,
//   productName,
// }: {
//   priceInCents: number;
//   productId: string;
//   productName: string;
// }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string>();
//   const [status, setStatus] = useState("");
//   const [formData, setFormData] = useState({
//     customerName: "",
//     productName: productName,
//     productId: productId,
//     priceInCents: priceInCents,
//     email: "",
//     message: "",
//     phone: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/sendProducts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setStatus(
//           "Thank you! We have received your product request. We will contact you for confirmation as soon as possible!"
//         );
//         setFormData({
//           customerName: "",
//           productName: "",
//           productId: "",
//           priceInCents: 0,
//           email: "",
//           message: "",
//           phone: "",
//         });
//       } else {
//         setStatus("Failed to submit the product request.");
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Checkout</CardTitle>
//           {errorMessage && (
//             <CardDescription className="text-destructive">
//               {errorMessage}
//             </CardDescription>
//           )}
//         </CardHeader>
//         <CardContent>
//           <div className="mb-5"></div>
//           <h3 className="text-muted-foreground">
//             Please fill the below information to send your order to our telegram
//             bot. We will contact you as soon as possible for your order
//             confirmation.
//           </h3>
//           <div className="mt-4">
//             <div className="p-5">
//               <label
//                 htmlFor="customerName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Customer Name
//               </label>
//               <Input
//                 onChange={handleChange}
//                 id="customerName"
//                 name="customerName"
//                 required
//                 className="mt-1"
//                 value={formData.customerName}
//               />
//             </div>
//             <div className="p-5">
//               <label
//                 htmlFor="productName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Product Name
//               </label>
//               <Input
//                 onChange={handleChange}
//                 id="productName"
//                 name="productName"
//                 required
//                 className="mt-1"
//                 value={formData.productName}
//               />
//             </div>
//             <div className="p-5">
//               <label
//                 htmlFor="priceInCents"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Price
//               </label>
//               <Input
//                 onChange={handleChange}
//                 id="priceInCents"
//                 name="priceInCents"
//                 required
//                 className="mt-1"
//                 value={formData.priceInCents}
//               />
//             </div>
//             <div className="p-5">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <Input
//                 onChange={handleChange}
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 className="mt-1"
//                 value={formData.email}
//               />
//             </div>
//             <div className="p-5">
//               <PhoneInput
//                 country="mv"
//                 value={formData.phone}
//                 onChange={(phone) => setFormData({ ...formData, phone })}
//                 placeholder="+960 000 0000"
//                 inputProps={{
//                   className: "flex flex-row ml-10 w-[93%] h-9 rounded-md",
//                 }}
//               />
//             </div>
//             <Button
//               className="w-auto  bg-green-600 text-white hover:bg-green-700 transition-colors"
//               size="lg"
//               disabled={isLoading}
//             >
//               {isLoading ? "SENDING..." : "SEND ORDER"}
//             </Button>
//             {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
//           </div>
//         </CardContent>
//         <CardFooter></CardFooter>
//       </Card>
//     </form>
//   );
// }

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
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Input } from "@/src/components/ui/input";
import SuccessModal from "@/src/components/SuccessModal"; // Import the new SuccessModal component

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

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  return (
    <div className="mt-20 max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#3E3C37]">{product.name}</h1>
          <p className="line-clamp-3 text-muted-foreground leading-relaxed text-justify">
            {product.description}
          </p>
          <p className="text-lg font-semibold text-[#3E3C37]">{formatCurrency(product.priceInCents)}</p>
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    productName: productName,
    productId: productId,
    priceInCents: priceInCents,
    email: "",
    message: "",
    phone: "",
  });


  const resetFormData = () => {
    setFormData({
      customerName: "",
      productName: productName,
      productId: productId,
      priceInCents: priceInCents,
      email: "",
      message: "",
      phone: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/sendProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(true);
        resetFormData(); // Reset the form data after successful submission
      } else {
        setErrorMessage("Failed to submit the product request.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#3E3C37]">Checkout</CardTitle>
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
                className="block text-sm font-medium text-[#3E3C37]"
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
                htmlFor="priceInCents"
                className="block text-sm font-medium text-[#3E3C37]"
              >
                Price
              </label>
              <Input
                onChange={handleChange}
                id="priceInCents"
                name="priceInCents"
                required
                className="mt-1"
                value={formData.priceInCents}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3E3C37]"
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
            <Button
              className="w-auto bg-green-600 text-white hover:bg-green-700 transition-colors"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "SENDING..." : "SEND ORDER"}
            </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      <SuccessModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </form>
  );
}
