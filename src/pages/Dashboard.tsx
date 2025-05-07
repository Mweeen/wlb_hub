import React from 'react';
import { motion } from 'framer-motion';
import DailyTip from '../components/dashboard/DailyTip';
import BudgetMetrics from '../components/dashboard/BudgetMetrics';
import EventsList from '../components/dashboard/EventsList';
import AnnouncementCard from '../components/dashboard/AnnouncementCard';
import FunctionalitySummary from '../components/dashboard/FunctionalitySummary';
import { useAuth } from '../contexts/AuthContext';
import {
  BanknotesIcon,
  CalendarIcon,
  MegaphoneIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Sample data - in a real application, this would come from API calls
  const dailyTip = {
    content: "Take short breaks throughout your workday to stretch, meditate, or go for a brief walk. These microbreaks can boost productivity and reduce stress.",
    author: "Wellness Team"
  };
  
  const budgetData = {
    labels: ['Team Building', 'CSR Events', 'Training', 'Celebrations', 'Misc'],
    values: [40000, 30000, 20000, 10000, 5000],
    total: 120000,
    spent: 65000,
  };
  
  const events = [
    {
      id: '1',
      title: 'Team Building: Outdoor Adventure',
      date: '2025-05-15T10:00:00',
      type: 'Team Building',
      attendees: 25,
    },
    {
      id: '2',
      title: 'Community Clean-up Drive',
      date: '2025-05-22T09:00:00',
      type: 'CSR',
      attendees: 18,
    },
    {
      id: '3',
      title: 'Emily Watson\'s Birthday Celebration',
      date: '2025-05-10T14:00:00',
      type: 'Birthday',
    },
    {
      id: '4',
      title: 'John Smith\'s 5 Year Work Anniversary',
      date: '2025-05-12T15:30:00',
      type: 'Anniversary',
    },
  ];
  
  const announcements = [
    {
      id: '1',
      title: 'New Wellness Program Launch',
      content: 'We\'re excited to announce the launch of our new wellness program starting next month. The program includes fitness classes, meditation sessions, and nutrition workshops.',
      date: '2025-05-04T08:00:00',
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Office Closure - Memorial Day',
      content: 'Please note that our office will be closed on Monday, May 26th, in observance of Memorial Day. Regular hours will resume on Tuesday.',
      date: '2025-05-06T10:30:00',
      priority: 'medium' as const,
    },
  ];
  
  const features = [
    {
      id: '1',
      title: 'Budget Management',
      description: 'Manage and track budgets for different activities',
      icon: <BanknotesIcon className="h-5 w-5" />,
      path: '/budget',
      count: 3,
    },
    {
      id: '2',
      title: 'Event Planning',
      description: 'Plan and organize team events',
      icon: <CalendarIcon className="h-5 w-5" />,
      path: '/events',
      count: 4,
    },
    {
      id: '3',
      title: 'Announcements',
      description: 'Create and manage important announcements',
      icon: <MegaphoneIcon className="h-5 w-5" />,
      path: '/announcements',
      count: 2,
    },
    {
      id: '4',
      title: 'User Management',
      description: 'Manage User information and preferences',
      icon: <UserGroupIcon className="h-5 w-5" />,
      path: '/users',
    },
  ];

  return (
    <motion.div 
      className="py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-semibold text-dark-blue">Welcome, {user?.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's your Work-Life Balance Hub overview
          </p>
        </motion.div>
        
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
          <motion.div 
            className="lg:col-span-1 sm:col-span-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <DailyTip tip={dailyTip} />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 sm:col-span-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BudgetMetrics data={budgetData} />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-1 sm:col-span-2 lg:col-start-4 lg:row-span-2"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <EventsList events={events} />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 sm:col-span-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <AnnouncementCard announcements={announcements} />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-1 sm:col-span-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FunctionalitySummary features={features} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;