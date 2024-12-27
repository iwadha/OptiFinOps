import React, { useState } from 'react';
import { ChevronDown, Server, Cloud, Cpu } from 'lucide-react';

const MobileProviderComparison = () => {
  const [activeProvider, setActiveProvider] = useState('aws');
  const [activeCategory, setActiveCategory] = useState('overview');

  const providerData = {
    aws: {
      name: "AWS",
      bgGradient: "from-orange-500 to-orange-600",
      color: "text-orange-600",
      overview: {
        marketShare: "33%",
        globalRegions: 25,
        serviceCount: "200+",
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
      bgGradient: "from-blue-500 to-blue-600",
      color: "text-blue-600",
      overview: {
        marketShare: "22%",
        globalRegions: 60,
        serviceCount: "200+",
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
      name: "Google",
      bgGradient: "from-green-500 to-green-600",
      color: "text-green-600",
      overview: {
        marketShare: "9%",
        globalRegions: 24,
        serviceCount: "100+",
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

  const CategoryCard = ({ title, content, type }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{title}</h3>
      {type === "list" ? (
        <ul className="space-y-2">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
              <span className="text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      ) : type === "tags" ? (
        <div className="flex flex-wrap gap-2">
          {content.map((tag, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-400">{content}</p>
      )}
    </div>
  );

  const renderContent = () => {
    const provider = providerData[activeProvider];
    const data = provider[activeCategory];

    switch (activeCategory) {
      case 'overview':
        return (
          <>
            <CategoryCard
              title="Market Share"
              content={provider.overview.marketShare}
            />
            <CategoryCard
              title="Global Regions"
              content={`${provider.overview.globalRegions} regions worldwide`}
            />
            <CategoryCard
              title="Available Services"
              content={provider.overview.serviceCount}
            />
            <CategoryCard
              title="Certifications"
              content={provider.overview.certifications}
              type="tags"
            />
          </>
        );
      default:
        return (
          <>
            <CategoryCard
              title={`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Types`}
              content={data.types}
              type="tags"
            />
            <CategoryCard
              title="Key Features"
              content={data.features}
              type="list"
            />
            <CategoryCard
              title="Pricing"
              content={data.pricing}
            />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg px-0 py-4">
      <div className="flex overflow-x-auto gap-2 p-2 mx-4 bg-white dark:bg-gray-800 rounded-lg mb-4">
        {Object.entries(providerData).map(([key, provider]) => (
          <button
            key={key}
            onClick={() => setActiveProvider(key)}
            className={`flex items-center gap-2 p-2 rounded-lg flex-shrink-0 transition-colors
              ${activeProvider === key ? "bg-gray-100 dark:bg-gray-700" : ""}`}
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${provider.bgGradient} 
              flex items-center justify-center text-white`}>
              {key === 'aws' ? <Server size={20} /> : 
               key === 'azure' ? <Cloud size={20} /> : 
               <Cpu size={20} />}
            </div>
            <span className={`text-sm font-medium ${
              activeProvider === key ? provider.color : "text-gray-600 dark:text-gray-400"
            }`}>
              {provider.name}
            </span>
          </button>
        ))}
      </div>

      <div className="flex overflow-x-auto gap-2 mb-4 mx-4">
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

      <div className="space-y-4 px-4">
        {renderContent()}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          * Pricing and features may vary by region and specific service configurations
        </p>
      </div>
    </div>
  );
};

export default MobileProviderComparison;
