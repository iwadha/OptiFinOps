import React, { useState } from 'react';
import { Server, Cloud, Cpu } from 'lucide-react';

const MobileProviderComparison = () => {
  const [activeProvider, setActiveProvider] = useState('aws');
  const [activeCategory, setActiveCategory] = useState('overview');

  const providerData = {
    aws: {
      name: "AWS",
      icon: Server,
      bgColor: "bg-orange-500",
      overview: {
        marketShare: "33%",
        globalRegions: "25 regions worldwide",
        serviceCount: "200+"
      },
      compute: {
        types: ["On-demand", "Spot", "Reserved", "Savings Plans"],
        features: ["Auto Scaling", "Load Balancing", "Containers", "Serverless"],
        pricing: "Starting at $0.023/hour"
      }
    },
    azure: {
      name: "Azure",
      icon: Cloud,
      bgColor: "bg-blue-500",
      overview: {
        marketShare: "22%",
        globalRegions: "60+ regions worldwide",
        serviceCount: "200+"
      },
      compute: {
        types: ["On-demand", "Spot", "Reserved"],
        features: ["Auto Scaling", "Load Balancing", "Containers", "Serverless"],
        pricing: "Starting at $0.02/hour"
      }
    },
    gcp: {
      name: "Google",
      icon: Cpu,
      bgColor: "bg-green-500",
      overview: {
        marketShare: "9%",
        globalRegions: "24+ regions worldwide",
        serviceCount: "100+"
      },
      compute: {
        types: ["On-demand", "Spot", "Reserved"],
        features: ["Auto Scaling", "Load Balancing", "Containers", "Serverless"],
        pricing: "Starting at $0.021/hour"
      }
    }
  };

  const renderContent = () => {
    const provider = providerData[activeProvider];
    
    switch (activeCategory) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div className="bg-gray-900/60 rounded-lg p-4">
              <h3 className="text-gray-400 mb-2">Market Share</h3>
              <p className="text-gray-300">{provider.overview.marketShare}</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4">
              <h3 className="text-gray-400 mb-2">Global Regions</h3>
              <p className="text-gray-300">{provider.overview.globalRegions}</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4">
              <h3 className="text-gray-400 mb-2">Available Services</h3>
              <p className="text-gray-300">{provider.overview.serviceCount}</p>
            </div>
          </div>
        );
      case 'compute':
        return (
          <div className="space-y-4">
            <div className="bg-gray-900/60 rounded-lg p-4">
              <h3 className="text-gray-400 mb-2">Compute Types</h3>
              <div className="flex flex-wrap gap-2">
                {provider.compute.types.map((type, index) => (
                  <span key={index} className="bg-blue-900 text-blue-300 px-3 py-1 rounded-lg text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4">
              <h3 className="text-gray-400 mb-2">Key Features</h3>
              <div className="space-y-2">
                {provider.compute.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4">
              <h3 className="text-gray-400 mb-2">Pricing</h3>
              <p className="text-gray-300">{provider.compute.pricing}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Cloud Provider Selection */}
      <div className="bg-gray-900/60 rounded-lg p-4">
        <div className="flex items-center justify-between px-2">
          {Object.entries(providerData).map(([key, provider]) => (
            <button
              key={key}
              onClick={() => setActiveProvider(key)}
              className="flex items-center gap-2"
            >
              <div className={`w-8 h-8 rounded-lg ${provider.bgColor} flex items-center justify-center`}>
                <provider.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-300 text-sm">{provider.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-gray-900/60 rounded-lg p-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {['overview', 'compute', 'storage', 'database'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap ${
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

      {/* Content Area */}
      {renderContent()}
      
      {/* Let's Talk Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => document.getElementById('contactModal').classList.remove('hidden')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Let's Talk
        </button>
      </div>
    </div>
  );
};

export default MobileProviderComparison;
