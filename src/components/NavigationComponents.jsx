import React, { useState, useEffect } from 'react';
import { ChevronRight, HelpCircle, Cloud, Server, Cpu } from 'lucide-react';
import MobileProviderComparison from './MobileProviderComparison';

// Breadcrumb Navigation Component
export const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 mx-2" />
            )}
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

// FAQ Section Component
export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does cloud cost optimization work?",
      answer:
        "Cloud cost optimization works by analyzing your infrastructure usage patterns, identifying inefficiencies, and implementing automated solutions to reduce waste. This includes right-sizing resources, leveraging reserved instances, and optimizing storage tiers.",
      icon: "BarChart2",
      color: "text-blue-500",
    },
    {
      question: "What savings can I typically expect?",
      answer:
        "Typical savings range from 20-40% of cloud spend, depending on your current infrastructure setup, utilization patterns, and the optimization strategies implemented. Some organizations can achieve even higher savings through comprehensive optimization.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Initial savings can be seen within the first month of implementation. However, the full benefits of optimization typically materialize over 3-6 months as usage patterns are analyzed and optimizations are fine-tuned.",
    },
    {
      question: "Do I need to change my application architecture?",
      answer:
        "In most cases, no. Our optimization strategies work with your existing architecture. However, we may recommend optional architectural improvements that could lead to additional cost savings.",
    },
    {
      question: "What cloud providers do you support?",
      answer:
        "We support all major cloud providers including AWS, Microsoft Azure, and Google Cloud Platform. Our solutions can also work with multi-cloud environments.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our cloud cost optimization solutions
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold pr-8">{faq.question}</h3>
                  <div
                    className={`transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={`mt-4 text-gray-600 dark:text-gray-400 overflow-hidden transition-all duration-200 ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pb-4">{faq.answer}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Still have questions? We're here to help!
          </p>
          <button
            onClick={() =>
              document.getElementById("contactModal").classList.remove("hidden")
            }
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
};

// Cloud Provider Comparison Table
export const ProviderComparison = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop version of the provider comparison
  const DesktopProviderComparison = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const providers = {
      aws: {
        name: "AWS",
        icon: Server,
        bgGradient: "from-orange-500 to-orange-600",
        overview: {
          marketShare: "33%",
          globalRegions: 25,
          serviceCount: "200+",
          certifications: ["SOC", "ISO", "PCI", "HIPAA"],
        },
        compute: {
          types: ["On-demand", "Spot", "Reserved Instances", "Savings Plans"],
          features: [
            "Auto Scaling",
            "Load Balancing",
            "Container Services",
            "Serverless Computing",
          ],
          pricing: {
            onDemand: "$0.023-$0.125/hour",
            spot: "Up to 90% off on-demand",
            reserved: "Up to 72% off on-demand",
          },
        },
        storage: {
          types: ["Object (S3)", "Block (EBS)", "File (EFS)", "Archive (Glacier)"],
          features: [
            "Automatic tiering",
            "Cross-region replication",
            "Versioning",
            "Lifecycle management",
          ],
          pricing: "$0.023/GB - $0.125/GB",
        },
        database: {
          engines: ["MySQL", "PostgreSQL", "Oracle", "SQL Server", "MongoDB"],
          features: [
            "Automated backups",
            "Read replicas",
            "Multi-AZ deployment",
            "Automated patching",
          ],
          pricing: "Pay per hour + storage",
        },
      },
      azure: {
        name: "Azure",
        icon: Cloud,
        bgGradient: "from-blue-500 to-blue-600",
        overview: {
          marketShare: "22%",
          globalRegions: 60,
          serviceCount: "200+",
          certifications: ["SOC", "ISO", "PCI", "HIPAA"],
        },
        compute: {
          types: ["Pay-as-you-go", "Spot", "Reserved Instances"],
          features: [
            "Virtual Machine Scale Sets",
            "Azure Kubernetes Service",
            "Azure Functions",
            "Azure App Service",
          ],
          pricing: {
            onDemand: "$0.020-$0.120/hour",
            spot: "Up to 90% off on-demand",
            reserved: "Up to 72% off on-demand",
          },
        },
        storage: {
          types: ["Blob Storage", "Disk Storage", "File Storage", "Archive Storage"],
          features: [
            "Hot, cool, and archive tiers",
            "Geo-redundancy",
            "Data lifecycle management",
            "Azure CDN integration",
          ],
          pricing: "$0.018/GB - $0.12/GB",
        },
        database: {
          engines: ["SQL Database", "MySQL", "PostgreSQL", "MariaDB", "Cosmos DB"],
          features: [
            "Automatic tuning",
            "Geo-replication",
            "Hybrid flexibility",
            "Built-in intelligence",
          ],
          pricing: "DTU-based, vCore-based pricing",
        },
      },
      gcp: {
        name: "Google Cloud",
        icon: Cpu,
        bgGradient: "from-green-500 to-green-600",
        overview: {
          marketShare: "9%",
          globalRegions: 24,
          serviceCount: "100+",
          certifications: ["SOC", "ISO", "PCI", "HIPAA"],
        },
        compute: {
          types: ["On-demand", "Preemptible", "Committed use"],
          features: [
            "Managed Instance Groups",
            "Google Kubernetes Engine",
            "Cloud Functions",
            "App Engine",
          ],
          pricing: {
            onDemand: "$0.021-$0.120/hour",
            spot: "Up to 91% off on-demand",
            committed: "Up to 70% off on-demand",
          },
        },
        storage: {
          types: ["Cloud Storage", "Persistent Disk", "Filestore", "Archive Storage"],
          features: [
            "Multi-regional",
            "Object lifecycle management",
            "Strong consistency",
            "Integrated CDN",
          ],
          pricing: "$0.020/GB - $0.115/GB",
        },
        database: {
          engines: ["Cloud SQL", "Cloud Spanner", "Cloud Bigtable", "Firestore"],
          features: [
            "Automatic replication",
            "Scalable performance",
            "Integrated ML capabilities",
            "Serverless options",
          ],
          pricing: "Per-second billing, committed use",
        },
      },
    };

    const tabs = [
      { id: "overview", label: "Overview", icon: Server },
      { id: "compute", label: "Compute", icon: Cloud },
      { id: "storage", label: "Storage", icon: HelpCircle },
      { id: "database", label: "Database", icon: Server },
    ];

    const renderTableContent = () => {
      // ... (keep your existing renderTableContent logic)
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

        <div className="overflow-x-auto">{renderTableContent()}</div>

        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-sm text-gray-500 dark:text-gray-400">
          * Pricing and features may vary by region and specific service configurations
        </div>
      </div>
    );
  };

  return isMobile ? <MobileProviderComparison /> : <DesktopProviderComparison />;
};

export default {
  Breadcrumb,
  FAQSection,
  ProviderComparison,
};
