
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const ContactUs: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-md">
    {/* Contact Form Section */}
    <div className="w-full md:w-1/2 md:pr-6 mb-6 md:mb-0">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-4">We’d love to hear from you! Please reach out with any questions, feedback, or for assistance using the form below.</p>
      <form action="#" method="POST" className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Input id="name" name="name" required className="mt-1" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Input type="email" id="email" name="email" required className="mt-1" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <Textarea id="message" name="message" rows={4} required className="mt-1" />
        </div>
        <Button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white  bg-[#62A83c]/90 hover:bg-[#62A83c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#62A83c]">
          Send Message
        </Button>
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