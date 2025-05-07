import React from 'react';
import Card from '../common/Card';
import { LightBulbIcon } from '@heroicons/react/24/outline';

interface DailyTipProps {
  tip: {
    content: string;
    author?: string;
  };
}

const DailyTip: React.FC<DailyTipProps> = ({ tip }) => {
  return (
    <Card 
      title="Mental Health Tip of the Day" 
      icon={<LightBulbIcon className="h-5 w-5 text-yellow" />}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        <p className="text-gray-700 italic mb-4">"{tip.content}"</p>
        {tip.author && (
          <p className="text-sm text-gray-500 mt-auto text-right">- {tip.author}</p>
        )}
      </div>
    </Card>
  );
};

export default DailyTip;