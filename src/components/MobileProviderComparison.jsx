import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Server, Cloud, Cpu } from 'lucide-react';

const MobileProviderComparison = () => {
  const [activeProvider, setActiveProvider] = useState('aws');
  const [activeCategory, setActiveCategory] = useState('overview');

  const providers = {
    aws: {
      name: "AWS",
      icon: Server,
      bgGradient: "from-orange-500 to-orange-600",
      color: "text-orange-600"
    },
    azure: {
      name: "Azure",
      icon: Cloud,
      bgGradient: "from-blue-500 to-blue-600",
      color: "text-blue-600"
    },
    gcp: {
      name: "Google Cloud",
      icon: Cpu,
      bgGradient: "from-green-500 to-green-600",
      color: "text-green-600"
    }
  };

  const categories = [
    { id: 'overview', label: 'Overview' },
    { id: 'compute', label: 'Compute' },
    { id: 'storage', label: 'Storage' },
    { id: 'database', label: 'Database' }
  ];

  // Mobile-optimized provider selector
  const ProviderSelector = () => (
    <div className="flex overflow-x-auto gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
      {Object.entries(providers).map(([key, provider]) => (
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
      {categories.map(category => (
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

  // Content mapping based on category
  const renderContent = () => {
    const provider = activeProvider;
    
    switch (activeCategory) {
      case 'overview':
        return (
          <>
            <ContentCard
              title="Market Position"
              content={`Market Share: ${providerData[provider].overview.marketShare}`}
            />
            <ContentCard
              title="Global Presence"
              content={`${providerData[provider].overview.globalRegions} Global Regions`}
            />
            <ContentCard
              title="Available Services"
              content={providerData[provider].overview.serviceCount}
            />
            <ContentCard
              title="Certifications"
              content={providerData[provider].overview.certifications}
              type="tags"
            />
          </>
        );
      
      case 'compute':
        return (
          <>
            <ContentCard
              title="Instance Types"
              content={providerData[provider].compute.types}
              type="tags"
            />
            <ContentCard
              title="Key Features"
              content={providerData[provider].compute.features}
              type="list"
            />
            <ContentCard
              title="Pricing Options"
              content={Object.entries(providerData[provider].compute.pricing).map(
                ([key, value]) => `${key}: ${value}`
              )}
              type="list"
            />
          </>
        );
      
      case 'storage':
        return (
          <>
            <ContentCard
              title="Storage Types"
              content={providerData[provider].storage.types}
              type="tags"
            />
            <ContentCard
              title="Features"
              content={providerData[provider].storage.features}
              type="list"
            />
            <ContentCard
              title="Pricing Range"
              content={providerData[provider].storage.pricing}
            />
          </>
        );
      
      case 'database':
        return (
          <>
            <ContentCard
              title="Database Engines"
              content={providerData[provider].database.engines}
              type="tags"
            />
            <ContentCard
              title="Features"
              content={providerData[provider].database.features}
              type="list"
            />
            <ContentCard
              title="Pricing Model"
              content={providerData[provider].database.pricing}
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
