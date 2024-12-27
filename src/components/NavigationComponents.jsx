import React, { useState, useEffect } from 'react';
import { ChevronRight, Server, Cloud, Cpu } from 'lucide-react';
import MobileProviderComparison from './MobileProviderComparison';

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
           <h2 class="text-2xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
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

export const ProviderComparison = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

 const DesktopComparison = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Server },
    { id: 'compute', label: 'Compute', icon: Cloud },
    { id: 'storage', label: 'Storage', icon: Server },
    { id: 'database', label: 'Database', icon: Cpu }
  ];

  const providerData = {
    aws: {
      name: "AWS",
      icon: Server,
      bgGradient: "from-orange-500 to-orange-600"
    },
    azure: {
      name: "Azure",
      icon: Cloud,
      bgGradient: "from-blue-500 to-blue-600"
    },
    gcp: {
      name: "Google",
      icon: Cpu,
      bgGradient: "from-green-500 to-green-600"
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <div className="border-b dark:border-gray-800">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="p-4 text-left">{activeTab === 'overview' ? 'Metric' : 'Feature'}</th>
              {Object.entries(providerData).map(([key, provider]) => (
                <th key={key} className="p-4 text-left">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${provider.bgGradient} flex items-center justify-center text-white`}>
                      <provider.icon size={20} className="text-white" />
                    </div>
                    <span>{provider.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

    

        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-4 text-left">Provider</th>
                <th className="p-4 text-left">AWS</th>
                <th className="p-4 text-left">Azure</th>
                <th className="p-4 text-left">Google</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'overview' ? (
                <>
                  <tr>
                    <td className="p-4 font-medium">Market Share</td>
                    <td className="p-4">33%</td>
                    <td className="p-4">22%</td>
                    <td className="p-4">9%</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Global Regions</td>
                    <td className="p-4">25+</td>
                    <td className="p-4">60+</td>
                    <td className="p-4">24+</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Services</td>
                    <td className="p-4">200+</td>
                    <td className="p-4">200+</td>
                    <td className="p-4">100+</td>
                  </tr>
                </>
              ) : activeTab === 'compute' ? (
                <>
                  <tr>
                    <td className="p-4 font-medium">Instance Types</td>
                    <td className="p-4">EC2, Lambda, ECS, EKS</td>
                    <td className="p-4">VM, Functions, AKS</td>
                    <td className="p-4">Compute Engine, GKE</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Pricing Models</td>
                    <td className="p-4">On-demand, Reserved, Spot</td>
                    <td className="p-4">Pay-as-you-go, Reserved</td>
                    <td className="p-4">On-demand, Committed use</td>
                  </tr>
                </>
              ) : activeTab === 'storage' ? (
                <>
                  <tr>
                    <td className="p-4 font-medium">Storage Types</td>
                    <td className="p-4">S3, EBS, EFS, Glacier</td>
                    <td className="p-4">Blob, Files, Disk</td>
                    <td className="p-4">Cloud Storage, Persistent Disk</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Pricing Range</td>
                    <td className="p-4">$0.023 - $0.125/GB</td>
                    <td className="p-4">$0.018 - $0.12/GB</td>
                    <td className="p-4">$0.020 - $0.115/GB</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td className="p-4 font-medium">Database Types</td>
                    <td className="p-4">RDS, DynamoDB, Redshift</td>
                    <td className="p-4">SQL Database, Cosmos DB</td>
                    <td className="p-4">Cloud SQL, Cloud Spanner</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Pricing Model</td>
                    <td className="p-4">Per hour + storage</td>
                    <td className="p-4">DTU/vCore based</td>
                    <td className="p-4">Per-second billing</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return isMobile ? <MobileProviderComparison /> : <DesktopComparison />;
};

export default {
  Breadcrumb,
  FAQSection,
  ProviderComparison,
};
