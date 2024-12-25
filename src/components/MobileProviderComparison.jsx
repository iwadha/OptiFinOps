import React, { useState } from 'react';
import { ChevronDown, Server, Cloud, Cpu } from 'lucide-react';

const MobileProviderComparison = () => {
  const [activeProvider, setActiveProvider] = useState('aws');
  const [activeCategory, setActiveCategory] = useState('overview');

  const providerData = {
    aws: {
      name: "AWS",
      icon: Server,
      bgColor: "bg-orange-500",
      textColor: "text-orange-600",
      overview: {
        marketShare: "33%",
        globalRegions: "25 regions worldwide",
        serviceCount: "200+ services",
        certifications: ["SOC", "ISO", "PCI", "HIPAA"]
      },
      compute: {
        types: ["On-demand", "Spot", "Reserved", "Savings Plans"],
        features: ["Auto Scaling", "Load Balancing", "Containers", "Serverless"],
        pricing: "Starting at $0.023/hour"
      },
      storage: {
        types: ["S3", "EBS", "EFS", "Glacier"],
        features: ["Auto-tiering", "Replication", "Versioning", "Lifecycle"],
        pricing: "$0.023/GB - $0.125/GB"
      },
      database: {
        types: ["RDS", "DynamoDB", "Redshift", "ElastiCache"],
        features: ["Auto Backup", "Replicas", "Multi-AZ", "Auto Patch"],
        pricing: "Pay per hour + storage"
      }
    },
    azure: {
      name: "Azure",
      icon: Cloud,
      bgColor: "bg-blue-500",
      textColor: "text-blue-600",
      overview: {
        marketShare: "22%",
        globalRegions: "60 regions worldwide",
        serviceCount: "200+ services",
        certifications: ["SOC", "ISO", "PCI", "HIPAA"]
      },
      compute: {
        types: ["Pay-as-you-go", "Spot", "Reserved"],
        features: ["VM Scale Sets", "AKS", "Functions", "App Service"],
        pricing: "Starting at $0.02/hour"
      },
      storage: {
        types: ["Blob", "Files", "Disk", "Archive"],
        features: ["Hot/Cool Tiers", "Redundancy", "Lifecycle", "CDN"],
        pricing: "$0.018/GB - $0.12/GB"
      },
      database: {
        types: ["SQL", "Cosmos DB", "MySQL", "PostgreSQL"],
        features: ["Auto-tune", "Geo-rep", "Serverless", "Intelligence"],
        pricing: "DTU or vCore based"
      }
    },
    gcp: {
      name: "Google Cloud",
      icon: Cpu,
      bgColor: "bg-green-500",
      textColor: "text-green-600",
      overview: {
        marketShare: "9%",
        globalRegions: "24 regions worldwide",
        serviceCount: "100+ services",
        certifications: ["SOC", "ISO", "PCI", "HIPAA"]
      },
      compute: {
        types: ["On-demand", "Preemptible", "Committed"],
        features: ["Instance Groups", "GKE", "Functions", "App Engine"],
        pricing: "Starting at $0.021/hour"
      },
      storage: {
        types: ["Cloud Storage", "Persistent", "Filestore"],
        features: ["Multi-regional", "Lifecycle", "Consistency", "CDN"],
        pricing: "$0.020/GB - $0.115/GB"
      },
      database: {
        types: ["Cloud SQL", "Spanner", "BigTable", "Firestore"],
        features: ["Replication", "Scaling", "ML Integration", "Serverless"],
        pricing: "Per-second billing"
      }
    }
  };

  const renderContent = () => {
    const provider = providerData[activeProvider];
    const data = provider[activeCategory];
    
    switch (activeCategory) {
      case 'overview':
        return (
          <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </h4>
                {Array.isArray(value) ? (
                  <div className="flex flex-wrap gap-2">
                    {value.map((item, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{value}</p>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Types
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.types.map((type, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Features
              </h4>
              <ul className="space-y-2">
                {data.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pricing
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{data.pricing}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
      <div className="flex overflow-x-auto gap-2 mb-4 p-2 bg-white dark:bg-gray-800 rounded-lg">
        {Object.entries(providerData).map(([key, provider]) => {
          const Icon = provider.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveProvider(key)}
              className={`flex items-center gap-2 p-2 rounded-lg flex-shrink-0 transition-colors
                ${activeProvider === key ? "bg-gray-100 dark:bg-gray-700" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg ${provider.bgColor} 
                flex items-center justify-center text-white`}>
                <Icon size={20} />
              </div>
              <span className={`text-sm font-medium ${
                activeProvider === key ? provider.textColor : "text-gray-600 dark:text-gray-400"
              }`}>
                {provider.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex overflow-x-auto gap-2 mb-4">
        {['overview', 'compute', 'storage', 'database'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm flex-shrink-0 transition-colors
              ${activeCategory === category 
                ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400"}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {renderContent()}

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          * Pricing and features may vary by region and specific service configurations
        </p>
      </div>
    </div>
  );
};

export default MobileProviderComparison;
