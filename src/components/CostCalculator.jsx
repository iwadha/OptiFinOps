import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CostCalculator() {
  const [formData, setFormData] = useState({
    currentSpend: "",
    provider: "aws",
    resourceType: "compute",
    utilizationRate: "50",
  });

  const [savings, setSavings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState("");

  const resetForm = () => {
    setFormData({
      currentSpend: "",
      provider: "aws",
      resourceType: "compute",
      utilizationRate: "50",
    });
    setSavings(null);
    setError(null);
  };

  const validateForm = () => {
    if (!formData.currentSpend) {
      setError("Please enter your current monthly spend");
      return false;
    }
    if (parseFloat(formData.currentSpend) <= 0) {
      setError("Monthly spend must be greater than 0");
      return false;
    }
    setError(null);
    return true;
  };

  const calculateSavings = async () => {
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const baseSpend = parseFloat(formData.currentSpend);
    const providerRates = {
      aws: 0.32,
      azure: 0.28,
      gcp: 0.3,
    };

    const resourceMultipliers = {
      compute: 1.2,
      storage: 1.0,
      database: 1.1,
    };

    const utilizationImpact = (100 - parseInt(formData.utilizationRate)) / 100;
    const savingsRate =
      providerRates[formData.provider] *
      resourceMultipliers[formData.resourceType] *
      (1 + utilizationImpact);

    const annualSavings = baseSpend * savingsRate * 12;

    // Generate projection data for the chart
    const projectionData = Array.from({ length: 12 }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() + i);
      const monthName = month.toLocaleString("default", { month: "short" });

      return {
        month: monthName,
        baseline: baseSpend,
        optimized: baseSpend * (1 - savingsRate * ((i + 1) / 12)),
        savings: baseSpend * (savingsRate * ((i + 1) / 12)),
      };
    });

    setSavings({
      monthly: (baseSpend * savingsRate).toFixed(2),
      annual: annualSavings.toFixed(2),
      percentage: (savingsRate * 100).toFixed(1),
      projection: projectionData,
    });

    setLoading(false);
  };

  const tooltips = {
    compute: {
      title: "Compute Resources",
      description:
        "Includes virtual machines, containers, and serverless functions",
      savings: {
        aws: [
          "Reserved Instances: Up to 72% with 3-year commitments",
          "Savings Plans: Up to 66% for compute workloads",
          "Spot Instances: Up to 90% for flexible workloads",
          "Right-sizing opportunities: 20-40% typical savings",
        ],
        azure: [
          "Reserved VM Instances: Up to 72% savings",
          "Azure Hybrid Benefit: Up to 40% additional savings",
          "Spot VMs: Up to 90% savings",
          "Azure Dev/Test pricing for development environments",
        ],
        gcp: [
          "Committed Use Discounts: Up to 70% savings",
          "Sustained Use Discounts: Automatic savings up to 30%",
          "Preemptible VMs: Up to 80% savings",
          "Custom machine types for exact sizing",
        ],
      },
    },
    storage: {
      title: "Storage Resources",
      description: "Includes object storage, block storage, and file systems",
      savings: {
        aws: [
          "S3 Intelligent Tiering: Automatic cost optimization",
          "Lifecycle policies: Up to 70% with Glacier storage",
          "EBS volume optimization: 20-40% typical savings",
          "Reserved capacity: Up to 50% savings",
        ],
        azure: [
          "Access tiers: Hot, Cool, Archive options",
          "Reserved capacity: Up to 50% savings",
          "Lifecycle management: Automatic tiering",
          "ZRS vs LRS/GRS options: Cost vs durability",
        ],
        gcp: [
          "Storage classes: Standard, Nearline, Coldline, Archive",
          "Object Lifecycle Management",
          "Committed use discounts for persistent disks",
          "Regional vs Multi-regional options",
        ],
      },
    },
    database: {
      title: "Database Resources",
      description: "Includes managed database services and data warehouses",
      savings: {
        aws: [
          "Reserved Instances: Up to 72% savings",
          "Multi-AZ deployment optimization",
          "Aurora Serverless: Pay per second",
          "Read replica optimization",
        ],
        azure: [
          "Reserved capacity: Up to 60% savings",
          "Hybrid benefit: Up to 40% additional savings",
          "Serverless compute tier",
          "Performance tier optimization",
        ],
        gcp: [
          "Committed use discounts: Up to 60% savings",
          "Cloud SQL automatic storage increases",
          "Serverless scaling options",
          "Regional vs multi-regional optimization",
        ],
      },
    },
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold mb-3">
          Calculate Your Potential Savings
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Estimate your potential cloud cost savings based on your current
          infrastructure.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start">
          <svg
            className="w-5 h-5 mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Current Monthly Cloud Spend ($)
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.currentSpend}
              onChange={(e) => {
                setFormData({ ...formData, currentSpend: e.target.value });
                setError(null);
              }}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Cloud Provider
            </label>
            <select
              value={formData.provider}
              onChange={(e) =>
                setFormData({ ...formData, provider: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            >
              <option value="aws">Amazon Web Services</option>
              <option value="azure">Microsoft Azure</option>
              <option value="gcp">Google Cloud Platform</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Primary Resource Type
              <HelpCircle
                className="inline-block ml-2 h-4 w-4 cursor-help"
                onMouseEnter={() => setShowTooltip(formData.resourceType)}
                onMouseLeave={() => setShowTooltip("")}
              />
            </label>
            <select
              value={formData.resourceType}
              onChange={(e) =>
                setFormData({ ...formData, resourceType: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            >
              <option value="compute">Compute (EC2, VM)</option>
              <option value="storage">Storage</option>
              <option value="database">Database</option>
            </select>
            {showTooltip && (
              <div className="absolute z-50 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-96">
                <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {tooltips[showTooltip].title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {tooltips[showTooltip].description}
                </p>
                <div className="space-y-3">
                  <h6 className="font-medium text-gray-900 dark:text-gray-100">
                    Savings opportunities for {formData.provider.toUpperCase()}:
                  </h6>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {tooltips[showTooltip].savings[formData.provider].map(
                      (saving, index) => (
                        <li key={index}>{saving}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Current Resource Utilization Rate: {formData.utilizationRate}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.utilizationRate}
            onChange={(e) =>
              setFormData({ ...formData, utilizationRate: e.target.value })
            }
            className="w-full accent-blue-600"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateSavings}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Calculating...
              </span>
            ) : (
              "Calculate Savings"
            )}
          </button>
          <button
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Reset
          </button>
        </div>

        {savings && (
          <div className="mt-8 space-y-8">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="text-xl font-bold mb-6 text-center">
                Estimated Savings
              </h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Monthly
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${savings.monthly}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Annual
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ${savings.annual}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Savings
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {savings.percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold mb-4">
                12-Month Cost Projection
              </h4>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={savings.projection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" tickFormatter={formatCurrency} />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "0.5rem",
                        color: "#F3F4F6",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="baseline"
                      name="Current Cost"
                      stroke="#6B7280"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="optimized"
                      name="Optimized Cost"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      name="Monthly Savings"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
