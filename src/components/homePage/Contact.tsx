"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [status, setStatus] = useState("");

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
        setStatus("Thank you! We have received your message.");
        setFormData({ name: "", email: "", message: "", phone: "" });
      } else {
        setStatus("Failed to submit the form.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <section className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Contact Form Section */}
      <div className="w-full md:w-1/2 md:pr-6 mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          We’d love to hear from you! Please reach out with any questions,
          feedback, or for assistance using the form below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              Message
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
          <Button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white  bg-[#62A83c]/90 hover:bg-[#62A83c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#62A83c]"
          >
            Send Message
          </Button>
          {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
        </form>
      </div>

      {/* Map Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Find Us</h2>
        <div className="relative h-96">
          {/* Replace with your actual map iframe or component */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8817168093126!2d-122.41941808468121!3d37.77492927975909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d8f34c75d%3A0x0!2zMzfCsDMzJzUxLjMiTiA3M8KwMjknNTkuMiJX!5e0!3m2!1sen!2sus!4v1632836739646!5m2!1sen!2sus"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
