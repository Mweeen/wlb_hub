import React from 'react';
import Card from '../common/Card';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  count?: number;
}

interface FunctionalitySummaryProps {
  features: Feature[];
}

const FunctionalitySummary: React.FC<FunctionalitySummaryProps> = ({ features }) => {
  return (
    <Card 
      title="Features Overview" 
      icon={<Squares2X2Icon className="h-5 w-5 text-yellow" />}
      className="h-full"
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
        {features.map((feature) => (
          <Link
            key={feature.id}
            to={feature.path}
            className="relative"
          >
            <motion.div
              className="rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 p-3 flex justify-center items-center h-24"
              whileHover="hover"
              initial="initial"
            >
              {/* Icon Container */}
              <motion.div 
                className="flex flex-col items-center justify-center text-center"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 0.9, transition: { duration: 0.2 } }
                }}
              >
                {/* Icon with Badge */}
                <div className="relative">
                  <div className="bg-dark-blue rounded-lg p-3 text-white">
                    {feature.icon}
                  </div>
                  {feature.count !== undefined && (
                    <span className="absolute -top-2 -right-2 bg-yellow text-dark-blue text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {feature.count}
                    </span>
                  )}
                </div>
                
                {/* Title visible by default */}
                {/* <motion.p 
                  className="mt-1.5 font-medium text-xs text-dark-blue text-center"
                  variants={{
                    initial: { opacity: 1 },
                    hover: { opacity: 0, transition: { duration: 0.1 } }
                  }}
                >
                  {feature.title}
                </motion.p> */}
              </motion.div>

              {/* Expanded Info on Hover */}
              <motion.div 
                className="absolute inset-0 bg-gray-50 rounded-lg p-3 flex flex-col justify-center items-center"
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: 1, transition: { duration: 0.3 } }
                }}
              >
                <p className="font-semibold text-dark-blue text-sm text-center">{feature.title}</p>
                <p className="text-xs text-gray-500 mt-1 ">{feature.description}</p>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default FunctionalitySummary;