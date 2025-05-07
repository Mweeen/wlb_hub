import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HomeIcon,
    BanknotesIcon,
    CalendarIcon,
    UserGroupIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/', icon: <HomeIcon className="w-6 h-6" /> },
        { name: 'Budget', href: '/budget', icon: <BanknotesIcon className="w-6 h-6" /> },
        { name: 'Events', href: '/events', icon: <CalendarIcon className="w-6 h-6" /> },
        { name: 'Calendar', href: '/calendar', icon: <CalendarIcon className="w-6 h-6" /> },
        { name: 'Users', href: '/users', icon: <UserGroupIcon className="w-6 h-6" /> },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const sidebarVariants = {
        expanded: { width: '16rem' },
        collapsed: { width: '5rem' }
    };

    // Remove the transitionEnd property to prevent text from disappearing abruptly
    const textVariants = {
        visible: {
            opacity: 1,
            x: 0,
            display: 'block',
            transition: {
                delay: 0.1,
                duration: 0.3
            }
        },
        hidden: {
            opacity: 0,
            x: -10,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.div
            className="fixed left-0 top-0 h-full bg-dark-blue text-white z-10 overflow-hidden"
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700 cursor-pointer"
                onClick={toggleSidebar}>
                <Link to="/" className={`flex items-center ${isCollapsed ? 'w-full justify-center' : 'justify-center w-full'}`}>
                    <AnimatePresence initial={false} mode="wait">
                        {!isCollapsed ? (
                            <motion.span
                                key="full-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-yellow font-bold text-xl"
                            >
                                WLB Hub
                            </motion.span>
                        ) : (
                            <motion.span
                                key="short-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-yellow font-bold text-2xl"
                            >
                                WLB
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            <div className="py-4">
                <div className="space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`
                                ${isActive(item.href)
                                    ? 'bg-gray-700 text-yellow'
                                    : 'text-white hover:bg-gray-700 hover:text-yellow'
                                } 
                                flex items-center transition-colors duration-200
                                ${isCollapsed ? 'justify-center px-0' : 'px-4'}
                                py-3
                            `}
                        >
                            <motion.div
                                className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.icon}
                            </motion.div>
                            {!isCollapsed && (
                                <motion.span
                                    className="ml-3 whitespace-nowrap"
                                    variants={textVariants}
                                    initial="visible"
                                    style={{ display: isCollapsed ? 'none' : 'block' }}
                                    animate={isCollapsed ? 'hidden' : 'visible'}
                                >
                                    {item.name}
                                </motion.span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            {user && (
                <div className={`absolute bottom-0 w-full border-t border-gray-700 p-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
                    {!isCollapsed ? (
                        <div className="flex items-center justify-between">
                            <motion.div
                                className="truncate"
                                variants={textVariants}
                                animate="visible"
                            >
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-gray-300 truncate">{user.email}</p>
                            </motion.div>
                            <motion.button
                                onClick={logout}
                                className="text-white hover:text-yellow transition-colors duration-200 ml-2"
                                title="Logout"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                            </motion.button>
                        </div>
                    ) : (
                        <motion.button
                            onClick={logout}
                            className="flex items-center justify-center text-white hover:text-yellow transition-colors duration-200"
                            title="Logout"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                        </motion.button>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default Sidebar;