import React from 'react';
import Card from '../common/Card';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetMetricsProps {
  data: {
    labels: string[];
    values: number[];
    total: number;
    spent: number;
  };
}

const BudgetMetrics: React.FC<BudgetMetricsProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          '#ffe600', // Yellow (primary)
          '#2e2e38', // Dark Blue (primary)
          '#4b4b57', // Lighter blue
          '#6b6b76', // Even lighter blue
          '#8a8a94',
        ],
        borderColor: ['#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
        },
      },
    },
    maintainAspectRatio: false,
    cutout: '70%',
  };

  const percentageSpent = ((data.spent / data.total) * 100).toFixed(1);

  return (
    <Card 
      title="Budget Overview" 
      icon={<ChartBarIcon className="h-5 w-5 text-yellow" />}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Total Budget</p>
            <p className="text-xl font-semibold">${data.total.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Spent</p>
            <p className="text-xl font-semibold">${data.spent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-xl font-semibold">${(data.total - data.spent).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="relative h-48 mt-4">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">{percentageSpent}%</p>
              <p className="text-xs text-gray-500">Utilized</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BudgetMetrics;