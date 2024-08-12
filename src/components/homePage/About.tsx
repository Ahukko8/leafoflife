import { Button } from "../ui/button";
import { Card } from "../ui/card";


const AboutUs: React.FC = () => {
    return (
      <section id="about" className="pt-20 pb-20 bg-gray-100 py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-smooth">
          <div className="">
            <h2 className="text-3xl font-extrabold text-gray-900">About Us</h2>
            <p className="mt-4 text-lg text-gray-600">
              At Leaf of Life Clinic, our mission is to revive and integrate traditional, holistic, herbal, and prophetic medicine into modern wellness practices. 
              We blend ancient wisdom with contemporary care to provide effective and natural solutions for your health and well-being.
            </p>
          </div>
          <div className="mt-10 flex flex-col md:flex-row md:space-x-6">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Card className="p-6 bg-gray-50 shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-base text-gray-700">
                  We believe in the power of nature and tradition. Our approach is rooted in the belief that holistic and herbal treatments can complement modern medicine, offering a comprehensive approach to health and healing.
                </p>
                {/* <Button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Learn More
                </Button> */}
              </Card>
            </div>
            <div className="md:w-1/2">
              <Card className="p-6 bg-gray-50 shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-base text-gray-700">
                  Our team consists of experienced practitioners who are dedicated to preserving traditional healing practices while embracing modern advancements in holistic medicine.
                </p>
                {/* <Button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Meet the Team
                </Button> */}
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;