import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../../../components/ui/card';

interface Service {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
}

const servicesData: Service[] = [
  {
    title: 'Holistic Medicine',
    slug: 'holistic-medicine',
    description:
      'Holistic medicine focuses on treating the whole person, considering physical, emotional, social, and spiritual well-being.',
    imageUrl: '/images/holistic-medicine.jpg',
  },
  {
    title: 'Herbal Medicine',
    slug: 'herbal-medicine',
    description:
      'Herbal medicine involves the use of plant-based remedies to treat various ailments. It is one of the oldest forms of medicine and continues to be used globally for its natural healing properties.',
    imageUrl: '/images/herbal-medicine.jpg',
  },
  {
    title: 'Hijama Therapy',
    slug: 'hijama-therapy',
    description:
      'Hijama therapy, also known as cupping, is a traditional practice that involves the application of suction cups to the skin. It is believed to promote blood circulation, detoxification, and overall health.',
    imageUrl: '/images/hijama-therapy.jpg',
  },
  {
    title: 'Traditional Dhivehi Beys',
    slug: 'traditional-dhivehi-beys',
    description:
      'Traditional Dhivehi Beys is the indigenous medical practice of the Maldives, utilizing local herbs and treatments passed down through generations.',
    imageUrl: '/images/dhivehi-beys.jpg',
  },
  {
    title: 'Herbal Physiotherapy',
    slug: 'herbal-physiotherapy',
    description:
      'Herbal physiotherapy combines physical therapy techniques with herbal treatments to promote healing and recovery.',
    imageUrl: '/images/herbal-physiotherapy.jpg',
  },
];

const ServiceCard: React.FC<Service> = ({ title, description, imageUrl, slug }) => {
  return (
    <Link href={`/${slug}`} passHref>
      
        <Card className="p-4 flex flex-col items-center text-center mb-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <Image
            src={imageUrl}
            alt={title}
            className="rounded-lg"
            width={400}
            height={300}
            layout="responsive"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mt-4">{title}</h3>
          <p className="text-gray-700 mt-2 line-clamp-2">{description}</p>
        </Card>
     
    </Link>
  );
};

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Our Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
