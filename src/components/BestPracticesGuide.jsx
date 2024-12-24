import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Settings,
  LineChart,
  DollarSign,
  BarChart,
} from "lucide-react";

const BestPracticesGuide = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const bestPractices = [
    {
      category: "Quick Wins",
      icon: Settings,
      description: "Immediate actions that can reduce costs within days",
      color: "text-green-600",
      practices: [
        {
          title: "Clean Up Unused Resources",
          description:
            "Identify and remove: Unattached volumes, obsolete snapshots, unused IP addresses, and idle load balancers.",
          impact: "High",
          effort: "Low",
          tips: [
            "Use cloud provider tools to identify unused resources",
            "Implement automated cleanup scripts",
            "Set up regular resource audits",
          ],
        },
        {
          title: "Right-Size Underutilized Instances",
          description:
            "Analyze CPU, memory, and network usage to identify oversized resources.",
          impact: "High",
          effort: "Medium",
          tips: [
            "Review instance metrics over 2-week periods",
            "Start with development environments",
            "Consider downsizing instances with < 20% utilization",
          ],
        },
      ],
    },
    {
      category: "Technical Optimization",
      icon: LineChart,
      description: "Engineering-focused improvements for better efficiency",
      color: "text-blue-600",
      practices: [
        {
          title: "Implement Auto-Scaling",
          description:
            "Set up dynamic resource scaling based on demand patterns.",
          impact: "High",
          effort: "Medium",
          tips: [
            "Start with non-critical workloads",
            "Use scaling policies based on metrics",
            "Set appropriate minimum and maximum thresholds",
          ],
        },
        {
          title: "Storage Lifecycle Management",
          description:
            "Automate data movement between storage tiers based on access patterns.",
          impact: "Medium",
          effort: "Low",
          tips: [
            "Use lifecycle policies for object storage",
            "Move infrequently accessed data to cheaper tiers",
            "Implement data retention policies",
          ],
        },
      ],
    },
    {
      category: "Financial Controls",
      icon: DollarSign,
      description: "Budgeting and financial management practices",
      color: "text-purple-600",
      practices: [
        {
          title: "Reserved Instance Strategy",
          description:
            "Plan and purchase reserved instances for predictable workloads.",
          impact: "High",
          effort: "Medium",
          tips: [
            "Analyze resource usage patterns over 3+ months",
            "Start with high-confidence workloads",
            "Consider flexible reservation types",
          ],
        },
        {
          title: "Budget Alerts",
          description: "Set up proactive cost monitoring and alerting.",
          impact: "Medium",
          effort: "Low",
          tips: [
            "Create alerts at 80% and 100% of budget",
            "Set up alerts per team/project",
            "Include trend-based alerts",
          ],
        },
      ],
    },
    {
      category: "Organizational Best Practices",
      icon: BarChart,
      description: "Process and policy improvements",
      color: "text-orange-600",
      practices: [
        {
          title: "Tagging Strategy",
          description:
            "Implement comprehensive resource tagging for better cost allocation.",
          impact: "High",
          effort: "Medium",
          tips: [
            "Define mandatory tags (owner, project, environment)",
            "Use automated tag enforcement",
            "Regular tag compliance audits",
          ],
        },
        {
          title: "Cost Center Mapping",
          description: "Map cloud resources to business units and projects.",
          impact: "Medium",
          effort: "Medium",
          tips: [
            "Align tags with organizational structure",
            "Create monthly cost allocation reports",
            "Review and adjust mapping quarterly",
          ],
        },
      ],
    },
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case "High":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getEffortColor = (effort) => {
    switch (effort) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">
          Best Practices Guide
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Implement these proven practices to improve your cloud cost management
          maturity
        </p>

        <div className="space-y-4">
          {bestPractices.map((category, index) => (
            <div
              key={index}
              className="border dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedCategory(expandedCategory === index ? null : index)
                }
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                  <div className="text-left">
                    <h4 className="font-semibold">{category.category}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                {expandedCategory === index ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedCategory === index && (
                <div className="p-6 space-y-6">
                  {category.practices.map((practice, practiceIndex) => (
                    <div
                      key={practiceIndex}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h5 className="font-semibold">{practice.title}</h5>
                        <div className="flex gap-4">
                          <span
                            className={`text-sm ${getImpactColor(
                              practice.impact
                            )}`}
                          >
                            Impact: {practice.impact}
                          </span>
                          <span
                            className={`text-sm ${getEffortColor(
                              practice.effort
                            )}`}
                          >
                            Effort: {practice.effort}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {practice.description}
                      </p>

                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                        <h6 className="font-medium mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          Implementation Tips
                        </h6>
                        <ul className="space-y-2">
                          {practice.tips.map((tip, tipIndex) => (
                            <li
                              key={tipIndex}
                              className="flex items-start gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {tip}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remember to test these practices in a non-production environment
              first and monitor their impact closely. Start with quick wins and
              gradually move to more complex optimizations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestPracticesGuide;
