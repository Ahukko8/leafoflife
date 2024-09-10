interface Treatment {
  id: string;
  title: string;
  description: string;
  items?: string[];
  imageUrl?: string;
}

const MOCK_TREATMENTS: Treatment[] = [
  {
    id: "1",
    title: "Herbal Medicine",
    description:
      "Herbal medicine uses plants or plant extracts to treat various health conditions and support overall health. Includes Maldivian traditional medicine along with other herbal medications",
    imageUrl: "/img/herbal.png",
  },
  {
    id: "2",
    title: "Cupping",
    description:
      "Cupping is a traditional therapy that involves placing cups on the skin to create suction, promoting blood flow and healing. We offer Dry cupping, Herbal cupping, Massage cupping, Flash cupping, Fire cupping, Bamboo cupping, Wet cupping",
      imageUrl: "/img/cupping.png"
  },
  {
    id: "3",
    title: "Moxibustion",
    description:
      "Moxibustion is a traditional Chinese medicine therapy that involves burning dried mugwort (a herb called moxa) near or on specific acupuncture points on the body.",
    imageUrl: "/img/moxibustion.png",
  },
  {
    id: "4",
    title: "Acupresure",
    description:
      "Acupressure is a traditional healing practice that involves applying pressure to specific points on the body, known as acupoints, to stimulate the body's natural self-healing abilities.",
   imageUrl: "/img/acupressure.png"
  },
  {
    id: "5",
    title: "Acupuncture",
    description:
      "Acupuncture is a traditional Chinese medicine practice that involves inserting thin, sterile needles into specific points on the body, known as acupuncture points or acupoints.",
   imageUrl: "/img/acupuncture.png"
  },
  {
    id: "6",
    title: "Herbal physiotherapy",
    description:
      "Herbal physiotherapy combines traditional physiotherapy techniques with the therapeutic use of herbal remedies to enhance healing and recovery.",
    imageUrl: "/img/physio.png"
  },
  {
    id: "7",
    title: "21 days diet plan",
    description:
      "Personlized 21 days diet plan for customers with various health issues or for general well being, as well as for athletes and body building.",
      imageUrl: "/img/21daysdiet.png",
  },
];
export default MOCK_TREATMENTS;
