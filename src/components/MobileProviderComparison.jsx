import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Server, Cloud, Cpu } from 'lucide-react';

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
        globalRegions: "25",
        serviceCount: "200+",
        certifications: ["SOC", "ISO", "PCI", "HIPAA"]
      },
      compute: {
        types: ["On-demand", "Spot", "Reserved Instances", "Savings Plans"],
        features: [
          "Auto Scaling",
          "Load Balancing",
          "Container Services",
          "Serverless Computing"
        ],
        pricing: "Starting at $0.023/hour"
      },
      storage: {
        types: ["S3", "EBS", "EFS", "Glacier"],
        features: [
          "Automatic tiering",
          "Cross-region replication",
          "Versioning",
          "Lifecycle management"
        ],
        pricing: "$0.023/GB - $0.125/GB"
      },
      database: {
        engines: ["MySQL", "PostgreSQL", "Oracle", "SQL Server"],
        features: [
          "Automated backups",
          "Read replicas",
          "Multi-AZ deployment",
          "Automated patching"
        ],
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
        globalRegions: "60+",
        serviceCount: "200+",
        certifications: ["SOC", "ISO", "PCI", "HIPAA"]
      },
      compute: {
        types: ["Pay-as-you-go", "Spot", "Reserved Instances"],
        features: [
          "VM Scale Sets",
          "Kubernetes Service",
          "Functions",
          "App Service"
        ],
        pricing: "Starting at $0.020/hour"
      },
      storage: {
        types: ["Blob", "Files", "Disks", "Archive"],
        features: [
          "Hot/Cool/Archive tiers",
          "Geo-redundancy",
          "Lifecycle management",
          "CDN integration"
        ],
        pricing: "$0.018/GB - $0.12/GB"
      },
      database: {
        engines: ["SQL Database", "MySQL", "PostgreSQL", "Cosmos DB"],
        features: [
          "Automatic tuning",
          "Geo-replication",
          "Serverless tier",
          "Built-in intelligence"
        ],
        pricing: "DTU or vCore based"
      }
    },
    gcp: {
      name: "Google Cloud",
      icon: Cpu,
      bgGradient: "from-green-500 to-green-600",
      color: "text-green-600",
      overview: {
        marketShare: "9%",
        globalRegions: "24",
        serviceCount: "100+",
        certifications: ["SOC", "ISO", "PCI", "HIPAA"]
      },
      compute: {
        types: ["On-demand", "Preemptible", "Committed use"],
        features: [
          "Instance Groups",
          "Kubernetes Engine",
          "Cloud Functions",
          "App Engine"
        ],
        pricing: "Starting at $0.021/hour"
      },
      storage: {
        types: ["Cloud Storage", "Persistent Disk", "Filestore"],
        features: [
          "Multi-regional",
          "Object lifecycle",
          "Strong consistency",
          "CDN integration"
        ],
        pricing: "$0.020/GB - $0.115/GB"
      },
      database: {
        engines: ["Cloud SQL", "Cloud Spanner", "BigTable", "Firestore"],
        features: [
          "Automatic replication",
          "Horizontal scaling",
          "ML integration",
          "Serverless options"
        ],
        pricing: "Per-second billing"
      }
    }
  };

  // Mobile-optimized provider selector
  const ProviderSelector = () => (
    <div className="flex overflow-x-auto gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
      {Object.entries(providerData).map(([key, provider]) => (
        <button
          key={key}
          onClick={() => setActiveProvider(key)}
          className={`flex items-center gap-2 p-2 rounded-lg flex-shrink-0 transition-colors
            ${activeProvider === key ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}
        >
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${provider.bgGradient} 
            flex items-center justify-center text-white`}>
            <provider.icon size={20} />
          </div>
          <span className={`text-sm font-medium ${
            activeProvider === key ? provider.color : "text-gray-600 dark:text-gray-400"
          }`}>
            {provider.name}
          </span>
        </button>
      ))}
    </div>
  );

  // Mobile-optimized category tabs
  const CategoryTabs = () => (
    <div className="flex overflow-x-auto gap-2 mb-4">
      {[
        { id: 'overview', label: 'Overview' },
        { id: 'compute', label: 'Compute' },
        { id: 'storage', label: 'Storage' },
        { id: 'database', label: 'Database' }
      ].map(category => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 rounded-lg text-sm flex-shrink-0 transition-colors
            ${activeCategory === category.id 
              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              : "text-gray-600 dark:text-gray-400"}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );

  // Mobile-optimized content cards
  const ContentCard = ({ title, content, type = "text" }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{title}</h3>
      {type === "list" ? (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
              <span className="text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      ) : type === "tags" ? (
        <div className="flex flex-wrap gap-2">
          {content.map((tag, index) => (
            <span 
              key={index}
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

  // Render content based on active category
  const renderContent = () => {
    const provider = activeProvider;
    const data = providerData[provider];
    
    switch (activeCategory) {
      case 'overview':
        return (
          <>
            <ContentCard
              title="Market Position"
              content={`Market Share: ${data.overview.marketShare}`}
            />
            <ContentCard
              title="Global Presence"
              content={`${data.overview.globalRegions} Global Regions`}
            />
            <ContentCard
              title="Available Services"
              content={data.overview.serviceCount}
            />
            <ContentCard
              title="Certifications"
              content={data.overview.certifications}
              type="tags"
            />
          </>
        );
      
      case 'compute':
        return (
          <>
            <ContentCard
              title="Instance Types"
              content={data.compute.types}
              type="tags"
            />
            <ContentCard
              title="Key Features"
              content={data.compute.features}
              type="list"
            />
            <ContentCard
              title="Pricing"
              content={data.compute.pricing}
            />
          </>
        );
      
      case 'storage':
        return (
          <>
            <ContentCard
              title="Storage Types"
              content={data.storage.types}
              type="tags"
            />
            <ContentCard
              title="Features"
              content={data.storage.features}
              type="list"
            />
            <ContentCard
              title="Pricing Range"
              content={data.storage.pricing}
            />
          </>
        );
      
      case 'database':
        return (
          <>
            <ContentCard
              title="Database Engines"
              content={data.database.engines}
              type="tags"
            />
            <ContentCard
              title="Features"
              content={data.database.features}
              type="list"
            />
            <ContentCard
              title="Pricing Model"
              content={data.database.pricing}
            />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
      <ProviderSelector />
      <CategoryTabs />
      <div className="space-y-4">
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
