"use client";

import SubmitButton from "../SubmitButton";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Thank you! We have received your appointment request.");
        setFormData({ name: "", email: "", message: "",  phone: "" });
      } else {
        setStatus("Failed to submit the appointment request.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">MAKE AN APPOINTMENT </h1>
          <p className="text-black">
            Send us your details and schedule your appointment!
          </p>
        </section>
        <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              onChange={handleChange}
              id="name"
              name="name"
              required
              className="mt-1"
              value={formData.name}
            />
          </div>
          <div>
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
          <div className="">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
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
          <div>
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
          </div>
        <SubmitButton isLoading={isLoading}>BOOK APPOINTMENT</SubmitButton>
        {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
      </form>
    
  );
};

export default PatientForm;

