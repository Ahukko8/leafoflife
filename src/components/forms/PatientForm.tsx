"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PhoneInput } from 'react-international-phone';
import { Calendar, Mail, User, Phone, CreditCard, MessageSquare, CheckCircle, Loader2, MapPin } from "lucide-react";

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    idCardNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "idCardNumber") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      if (/^[A-Z][0-9]*$/.test(capitalizedValue) || capitalizedValue === "") {
        setFormData((prevData) => ({ ...prevData, [name]: capitalizedValue }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({ ...prev, phone }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/sendAppointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Thank you! We have received your appointment request and will contact you shortly.");
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "", phone: "", idCardNumber: "" });
      } else {
        setStatus("Failed to submit the appointment request. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-white">
      <CardHeader className="space-y-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Book Your Appointment
            </CardTitle>
            <CardDescription className="text-base text-gray-600 mt-1">
              Fill in your details and we will get back to you soon
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <User className="w-4 h-4 text-gray-500" />
              Full Name *
            </label>
            <Input
              onChange={handleChange}
              id="name"
              name="name"
              required
              value={formData.name}
              placeholder="Enter your full name"
              className="border-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Mail className="w-4 h-4 text-gray-500" />
              Email Address *
            </label>
            <Input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              placeholder="your.email@example.com"
              className="border-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
            />
          </div>

          {/* ID Card */}
          <div className="space-y-2">
            <label
              htmlFor="idCard"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <CreditCard className="w-4 h-4 text-gray-500" />
              ID Card Number *
            </label>
            <Input
              onChange={handleChange}
              id="idCard"
              name="idCardNumber"
              required
              value={formData.idCardNumber}
              placeholder="A123456"
              className="border-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: A followed by numbers (e.g., A123456)
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Phone className="w-4 h-4 text-gray-500" />
              Phone Number *
            </label>
            <PhoneInput
              defaultCountry="mv"
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClassName="!w-full !h-11 !px-3 !py-2 !border-gray-300 !rounded-md focus:!border-red-500 focus:!ring-2 focus:!ring-red-500 focus:!ring-opacity-50 !text-base"
              countrySelectorStyleProps={{
                buttonClassName: "!h-11 !border-gray-300 !rounded-l-md !px-3 !bg-white hover:!bg-gray-50 !transition-colors",
                dropdownStyleProps: {
                  className: "!shadow-lg !border !border-gray-200 !rounded-md !mt-1",
                  listItemClassName: "hover:!bg-gray-50 !px-3 !py-2 !cursor-pointer",
                }
              }}
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <MessageSquare className="w-4 h-4 text-gray-500" />
              Treatment Details *
            </label>
            <Textarea
              onChange={handleChange}
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              placeholder="Please describe the treatment you're seeking or any specific concerns..."
              className="border-gray-300 focus:border-red-500 focus:ring-red-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </div>
            )}
          </Button>

          {/* Status Message */}
          {status && (
            <div
              className={`flex items-start gap-3 p-4 rounded-lg ${
                isSuccess
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {isSuccess && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />}
              <p
                className={`text-sm ${
                  isSuccess ? "text-green-800" : "text-red-700"
                }`}
              >
                {status}
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;