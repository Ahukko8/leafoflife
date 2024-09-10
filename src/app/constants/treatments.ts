
interface Treatment {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}
const treatments:  Treatment[] = [
  {
    id: 1,
    title: "Herbal Medicine",
    description:
      "Herbal medicine uses plants or plant extracts to treat various health conditions and support overall health. Includes Maldivian traditional medicine along with other herbal medications",
      imageUrl: "/images/general-health.jpg",
  
  },
  {
    id: 2,
    title: "Cupping",
    description:
      "Cupping is a traditional therapy that involves placing cups on the skin to create suction, promoting blood flow and healing. We offer a wide range of cupping therapies.",
      imageUrl: "/images/general-health.jpg",
   
  },
  {
    id: 3,
    title: "Moxabustion",
    description:
      "Moxibustion is a traditional Chinese medicine therapy that involves burning dried mugwort (a herb called moxa) near or on specific acupuncture points on the body.",
      imageUrl: "/images/general-health.jpg",
   
  },
  {
    id: 4,
    title: "Acurepresure",
    description:
      "Acupressure is a traditional healing practice that involves applying pressure to specific points on the body, known as acupoints, to stimulate the body's natural self-healing abilities.",
      imageUrl: "/images/general-health.jpg",
    
  },
  {
    id: 5,
    title: "Acurepuncture",
    description:
      "Acupuncture is a traditional Chinese medicine practice that involves inserting thin, sterile needles into specific points on the body, known as acupuncture points or acupoints.",
      imageUrl: "/img/bg.jpg",
    
  },
  {
    id: 6,
    title: "Herbal physiotherapy",
    description:
      "Herbal physiotherapy combines traditional physiotherapy techniques with the therapeutic use of herbal remedies to enhance healing and recovery.",
      imageUrl: "/images/general-health.jpg",
    
  },
  {
    id: 7,
    title: "21 days diet plan",
    description:
      "Personlized 21 days diet plan for customers with various health issues or for general well being, as well as for athletes and body building.",
      imageUrl: "/images/general-health.jpg"
  },

  // Add more services as needed
];

export default treatments;
