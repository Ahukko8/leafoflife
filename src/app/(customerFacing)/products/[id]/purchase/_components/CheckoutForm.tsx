"use client";
import { useState, useRef, useEffect } from "react";
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
import { Minus, Plus, ShoppingCart, Eye, X, ZoomIn, ArrowLeftIcon, CircleArrowLeft } from "lucide-react";
import Footer from "@/src/components/homePage/Footer";
import NavBar from "@/src/components/Navbar";
import Link from "next/link";

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
      <div className="min-h-screen flex flex-col">
        <NavBar/>
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 py-8">
          <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Section */}
              <div className="space-y-4">
                <ImagePreview imagePath={product.imagePath} productName={product.name} />
              </div>

              {/* Product Info & Form Section */}
              <div className="space-y-6">
                <ProductInfo product={product} />
                <Form
                  productName={product.name}
                  priceInCents={product.priceInCents}
                  productId={product.id}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
  );
}

function ImagePreview({ imagePath, productName }: { imagePath: string; productName: string }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="overflow-hidden border-0 shadow-xl bg-white">
        <div 
          ref={imageRef}
          className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 cursor-crosshair group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={imagePath}
            fill
            alt={productName}
            className="object-contain p-6 transition-transform duration-300"
          />
          
          {/* Zoom overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 shadow-lg">
              <ZoomIn className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Magnifier lens */}
          {showMagnifier && (
            <div 
              className="absolute w-32 h-32 border-2 border-blue-500 bg-blue-500 bg-opacity-10 rounded-full pointer-events-none hidden lg:block"
              style={{
                left: `${zoomPosition.x}%`,
                top: `${zoomPosition.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </div>
      </Card>

      {/* Floating magnified view - appears at cursor position like AliExpress */}
      {showMagnifier && (
        <div 
          className="fixed w-80 h-80 border-2 border-gray-300 bg-white rounded-lg shadow-2xl pointer-events-none z-50 hidden lg:block overflow-hidden"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y - 160}px`,
          }}
        >
          <div 
            className="w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${imagePath})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: '300%',
            }}
          />
        </div>
      )}

      {/* Full screen modal - Fixed */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 z-10"
              onClick={() => setIsZoomed(false)}
            >
              <X className="w-8 h-8" />
            </Button>
            <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
              <Image
                src={imagePath}
                fill
                alt={productName}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 border-gray-200 hover:bg-gray-50"
          onClick={() => setIsZoomed(true)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Full Size
        </Button>
      </div>
    </div>
  );
}

function ProductInfo({ product }: { product: CheckoutFormProps['product'] }) {
  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardContent className="p-6 space-y-4">
        <div>
          <Link href="/products" className="flex gap-1 text-xs text-green-600 hover:text-green-700">
          <CircleArrowLeft size={15}/>
          Go back      
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-green-600">
              {formatCurrency(product.priceInCents)}
            </span>
            <span className="text-sm text-gray-500">per item</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Product Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-sm text-orange-700">
            <span className="font-medium">Note:</span> Shipping costs and additional charges will apply at checkout
          </p>
        </div>
      </CardContent>
    </Card>
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

  const [formData, setFormData] = useState({
    customerName: "",
    productName,
    productId,
    priceInCents,
    quantity: 1,
    email: "",
    message: "",
    phone: "",
  });

  const totalPrice = priceInCents * formData.quantity;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      quantity: increment 
        ? prev.quantity + 1 
        : Math.max(1, prev.quantity - 1)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const response = await fetch("/api/sendProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          description: "Your order has been sent successfully! We will contact you shortly.",
          className: "border-green-500 bg-green-50 text-green-800",
        });
        setFormData({
          customerName: "",
          productName,
          productId,
          priceInCents,
          quantity: 1,
          email: "",
          message: "",
          phone: "",
        });
        router.push("/products");
      } else {
        setErrorMessage("Failed to submit the order. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^\d+]/g, "");
    setFormData((prev) => ({ ...prev, phone: onlyNums }));
  };

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Place Your Order
        </CardTitle>
        <CardDescription className="text-gray-600">
          Fill in your details below and we will contact you to confirm your order
        </CardDescription>
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <Input
                  id="customerName"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  pattern="^\+?([0-9]{1,3})?[-.\s]?([0-9]{6,14})$"
                  placeholder="+960 xxx xxxx"
                  value={formData.phone}
                  onChange={handlePhoneInput}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Order Details</h3>
            
            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(false)}
                  disabled={formData.quantity <= 1}
                  className="h-10 w-10 border-gray-300"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold min-w-[3rem] text-center">
                  {formData.quantity}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(true)}
                  className="h-10 w-10 border-gray-300"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Unit Price:</span>
                <span className="font-medium">{formatCurrency(priceInCents)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{formData.quantity}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-xl text-green-600">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>

            {/* Optional Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Any special requirements or notes..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Order...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Send Order - {formatCurrency(totalPrice)}
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}