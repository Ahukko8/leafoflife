"use client"

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Card } from '../ui/card';

interface FAQ {
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    question: 'What is holistic medicine?',
    answer: 'Holistic medicine focuses on treating the whole person, considering physical, emotional, social, and spiritual well-being.',
  },
  {
    question: 'What services does Leaf of Life Clinic offer?',
    answer: 'We offer traditional, holistic, herbal, and prophetic medicine treatments, integrating ancient wisdom with modern care.',
  },
  {
    question: 'How can I book an appointment?',
    answer: 'You can book an appointment by contacting us via phone or email, or by visiting our clinic in Ha. Kelaa.',
  },
  {
    question: 'Do you offer online consultations?',
    answer: 'Yes, we offer online consultations. Please contact us to schedule an appointment.',
  },
];

const FAQItem: React.FC<FAQ> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card className="p-4 mb-2 border border-gray-300 rounded-lg">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span>{isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-700">{answer}</p>}
    </Card>
  );
};

const FAQList: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQList;