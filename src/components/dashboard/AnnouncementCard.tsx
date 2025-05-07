import React from 'react';
import Card from '../common/Card';
import { MegaphoneIcon } from '@heroicons/react/24/outline';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface AnnouncementCardProps {
  announcements: Announcement[];
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcements }) => {
  return (
    <Card 
      title="Announcements" 
      icon={<MegaphoneIcon className="h-5 w-5 text-yellow" />}
      className="h-full"
    >
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No announcements at this time</p>
        ) : (
          announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`
                p-3 rounded-md border-l-4
                ${announcement.priority === 'high' ? 'bg-red-50 border-red-400' : ''}
                ${announcement.priority === 'medium' ? 'bg-yellow-50 border-yellow' : ''}
                ${announcement.priority === 'low' ? 'bg-blue-50 border-blue-400' : ''}
              `}
            >
              <div className="flex justify-between">
                <h4 className="text-sm font-medium text-dark-blue">{announcement.title}</h4>
                <span className="text-xs text-gray-500">
                  {new Date(announcement.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
              <button className="mt-1 text-xs text-dark-blue font-medium hover:text-yellow text-[#ffffff]">
                Read more
              </button>
            </div>
          ))
        )}
      </div>
      {announcements.length > 0 && (
        <div className="mt-4">
          <button className="text-sm font-medium text-dark-blue hover:text-yellow text-[#ffffff]">
            View all announcements
          </button>
        </div>
      )}
    </Card>
  );
};

export default AnnouncementCard;