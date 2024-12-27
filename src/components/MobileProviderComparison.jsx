import React, { useState } from 'react';
import { ChevronDown, Server, Cloud, Cpu } from 'lucide-react';

const MobileProviderComparison = () => {
  const [activeProvider, setActiveProvider] = useState('aws');
  const [activeCategory, setActiveCategory] = useState('overview');

  const providerData = {
    aws: {
      name: "AWS",
      icon: Server,
      bgGradient: "from-orange-500 to-orange-600",
      color: "text-orange-600",
      overview: {
        marketShare: "33%",
        globalRegions: 25,
        serviceCount: "200+",
        certifications: ["SOC", "ISO", "PCI", "HIPAA"]
      },
      compute: {
        types: ["On-demand", "Spot", "Reserved Instances", "Savings Plans"],
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
      icon: Cpu,
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

  const ContentCard = ({ title, content }) => (
    <div className="bg-gray-800/50 w-full p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{content}</p>
    </div>
  );

  const renderContent = () => {
    const provider = providerData[activeProvider];
    
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
              content={`${provider.overview.globalRegions} regions worldwide`}
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
              content={provider.compute.types.join(", ")}
            />
            <ContentCard
              title="Key Features"
              content={provider.compute.features.join(", ")}
            />
            <ContentCard
              title="Pricing"
              content={provider.compute.pricing}
            />
          </>
        );
      case 'storage':
        return (
          <>
            <ContentCard
              title="Storage Types"
              content={provider.storage.types.join(", ")}
            />
            <ContentCard
              title="Features"
              content={provider.storage.features.join(", ")}
            />
            <ContentCard
              title="Pricing"
              content={provider.storage.pricing}
            />
          </>
        );
      case 'database':
        return (
          <>
            <ContentCard
              title="Database Types"
              content={provider.database.types.join(", ")}
            />
            <ContentCard
              title="Features"
              content={provider.database.features.join(", ")}
            />
            <ContentCard
              title="Pricing"
              content={provider.database.pricing}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Provider Selector */}
      <div className="bg-gray-800/50 w-full p-4 mb-4">
        <div className="flex gap-4">
          {Object.entries(providerData).map(([key, provider]) => (
            <button
              key={key}
              onClick={() => setActiveProvider(key)}
              className={`flex items-center gap-2 rounded-lg flex-shrink-0 transition-colors
                ${activeProvider === key ? "bg-gray-700/50" : ""} p-2`}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${provider.bgGradient} 
                flex items-center justify-center text-white`}>
                <provider.icon size={20} />
              </div>
              <span className={`text-sm font-medium text-gray-300`}>
                {provider.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-gray-800/50 w-full p-4 mb-4">
        <div className="flex gap-4">
          {['overview', 'compute', 'storage', 'database'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                activeCategory === category 
                  ? "bg-blue-900/50 text-blue-300"
                  : "text-gray-400"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full space-y-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default MobileProviderComparison;
