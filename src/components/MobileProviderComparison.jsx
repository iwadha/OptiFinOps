import React, { useState } from 'react';
import { ChevronDown, Server, Cloud, Cpu } from 'lucide-react';

const MobileProviderComparison = () => {
  const [activeProvider, setActiveProvider] = useState('aws');
  const [activeCategory, setActiveCategory] = useState('overview');

  const providerData = {
    aws: {
      name: "AWS",
      icon: Server,
      bgGradient: "bg-orange-500",
      color: "text-orange-400",
      overview: {
        marketShare: "33%",
        globalRegions: "25 regions worldwide",
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
      icon: Cloud,
      bgGradient: "bg-blue-500",
      color: "text-blue-400",
      overview: {
        marketShare: "22%",
        globalRegions: "60+ regions worldwide",
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
      icon: Cpu,
      bgGradient: "bg-green-500",
      color: "text-green-400",
      overview: {
        marketShare: "9%",
        globalRegions: "24+ regions worldwide",
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

  const ContentCard = ({ title, content, type = "text" }) => (
    <div className="bg-gray-900 rounded-lg w-full p-4 mb-4">
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      {type === "list" ? (
        <ul className="space-y-2">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
              <span className="text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      ) : type === "tags" ? (
        <div className="flex flex-wrap gap-2">
          {content.map((tag, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 text-xs bg-blue-900 text-blue-300 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">{content}</p>
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
            <ContentCard
              title="Market Share"
              content={provider.overview.marketShare}
            />
            <ContentCard
              title="Global Regions"
              content={provider.overview.globalRegions}
            />
            <ContentCard
              title="Available Services"
              content={provider.overview.serviceCount}
            />
          </>
        );
      
      case 'compute':
        return (
          <>
            <ContentCard
              title="Compute Types"
              content={data.types}
              type="tags"
            />
            <ContentCard
              title="Key Features"
              content={data.features}
              type="list"
            />
            <ContentCard
              title="Pricing"
              content={data.pricing}
            />
          </>
        );
      
      case 'storage':
        return (
          <>
            <ContentCard
              title="Storage Types"
              content={data.types}
              type="tags"
            />
            <ContentCard
              title="Features"
              content={data.features}
              type="list"
            />
            <ContentCard
              title="Pricing"
              content={data.pricing}
            />
          </>
        );
      
      case 'database':
        return (
          <>
            <ContentCard
              title="Database Types"
              content={data.types}
              type="tags"
            />
            <ContentCard
              title="Features"
              content={data.features}
              type="list"
            />
            <ContentCard
              title="Pricing"
              content={data.pricing}
            />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Provider Selection - Fixed width container */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          {Object.entries(providerData).map(([key, provider]) => (
            <button
              key={key}
              onClick={() => setActiveProvider(key)}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors
                ${activeProvider === key ? "bg-gray-800" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg ${provider.bgGradient} flex items-center justify-center`}>
                <provider.icon size={20} className="text-white" />
              </div>
              <span className={`text-sm font-medium text-gray-300`}>{provider.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection - Scrollable container */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <div className="flex overflow-x-auto gap-4 no-scrollbar">
          {['overview', 'compute', 'storage', 'database'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                activeCategory === category 
                  ? "bg-blue-900 text-blue-300"
                  : "text-gray-400"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default MobileProviderComparison;
