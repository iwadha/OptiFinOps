import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Custom hook for mobile detection
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Chart component with mobile optimizations
export const CostProjectionChart = ({ data, formatCurrency }) => {
  const isMobile = useMobileDetection();

  return (
    <div className="w-full">
      <h4 className="text-lg font-semibold mb-4">12-Month Cost Projection</h4>
      <div className={`w-full ${isMobile ? 'h-64' : 'h-80'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={isMobile ? 
              { top: 5, right: 10, left: -20, bottom: 0 } : 
              { top: 5, right: 30, left: 20, bottom: 5 }
            }
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              interval={isMobile ? 1 : 0}
            />
            <YAxis 
              stroke="#6B7280"
              tickFormatter={formatCurrency}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 60 : 80}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "0.5rem",
                color: "#F3F4F6",
                fontSize: isMobile ? '12px' : '14px'
              }}
            />
            <Legend 
              verticalAlign={isMobile ? "bottom" : "top"}
              height={36}
              iconSize={isMobile ? 8 : 10}
              wrapperStyle={{
                fontSize: isMobile ? '10px' : '12px',
                paddingTop: isMobile ? '0' : '10px'
              }}
            />
            <Line
              type="monotone"
              dataKey="baseline"
              name="Current Cost"
              stroke="#6B7280"
              strokeWidth={isMobile ? 1 : 2}
              dot={!isMobile}
            />
            <Line
              type="monotone"
              dataKey="optimized"
              name="Optimized Cost"
              stroke="#3B82F6"
              strokeWidth={isMobile ? 1 : 2}
              dot={!isMobile}
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Monthly Savings"
              stroke="#10B981"
              strokeWidth={isMobile ? 1 : 2}
              dot={!isMobile}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Enhanced savings summary component with mobile responsiveness
export const SavingsSummary = ({ savings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly</p>
        <p className="text-xl sm:text-2xl font-bold text-blue-600">${savings.monthly}</p>
      </div>
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Annual</p>
        <p className="text-xl sm:text-2xl font-bold text-green-600">${savings.annual}</p>
      </div>
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Savings</p>
        <p className="text-xl sm:text-2xl font-bold text-purple-600">{savings.percentage}%</p>
      </div>
    </div>
  );
};
