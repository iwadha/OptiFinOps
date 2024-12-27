import React, { useState, useEffect } from 'react';
import { ChevronRight, Server, Cloud, Cpu } from 'lucide-react';

export const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 mx-2" />}
            <a
              href={item.href}
              className={`text-sm ${
                index === items.length - 1
                  ? "text-gray-700 dark:text-gray-300 font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does cloud cost optimization work?",
      answer: "Cloud cost optimization works by analyzing your infrastructure usage patterns, identifying inefficiencies, and implementing automated solutions to reduce waste. This includes right-sizing resources, leveraging reserved instances, and optimizing storage tiers.",
    },
    {
      question: "What savings can I typically expect?",
      answer: "Typical savings range from 20-40% of cloud spend, depending on your current infrastructure setup, utilization patterns, and the optimization strategies implemented.",
    },
    {
      question: "How long does it take to see results?",
      answer: "Initial savings can be seen within the first month of implementation. However, the full benefits typically materialize over 3-6 months as optimizations are fine-tuned.",
    },
    {
      question: "Do I need to change my application architecture?",
      answer: "In most cases, no. Our optimization strategies work with your existing architecture. However, we may recommend optional improvements for additional savings.",
    },
    {
      question: "What cloud providers do you support?",
      answer: "We support all major cloud providers including AWS, Microsoft Azure, and Google Cloud Platform. Our solutions can also work with multi-cloud environments.",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our cloud cost optimization solutions
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold pr-8">{faq.question}</h3>
                  <ChevronRight 
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default {
  Breadcrumb,
  FAQSection,
};
