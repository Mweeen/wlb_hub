import React from 'react';
import Card from '../common/Card';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  attendees?: number;
}

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <Card 
      title="Upcoming Events" 
      icon={<CalendarIcon className="h-5 w-5 text-yellow" />}
      className="h-full"
    >
      <div className="divide-y divide-gray-200">
        {events.length === 0 ? (
          <p className="text-gray-500 py-4 text-center">No upcoming events</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="py-3 flex items-start">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-dark-blue">{event.title}</p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric'
                  })}</span>
                  <span className="mx-1">&middot;</span>
                  <span>{event.type}</span>
                  {event.attendees !== undefined && (
                    <>
                      <span className="mx-1">&middot;</span>
                      <span>{event.attendees} attendees</span>
                    </>
                  )}
                </div>
              </div>
              <div className="ml-4">
                <div className={`
                  rounded-full w-3 h-3
                  ${event.type === 'Team Building' ? 'bg-green-400' : ''}
                  ${event.type === 'CSR' ? 'bg-blue-400' : ''}
                  ${event.type === 'Birthday' ? 'bg-purple-400' : ''}
                  ${event.type === 'Anniversary' ? 'bg-yellow' : ''}
                  ${!['Team Building', 'CSR', 'Birthday', 'Anniversary'].includes(event.type) ? 'bg-gray-400' : ''}
                `} />
              </div>
            </div>
          ))
        )}
      </div>
      {events.length > 0 && (
        <div className="mt-4">
          <button className="text-sm font-medium text-dark-blue hover:text-yellow text-[#ffffff]">
            View all events
          </button>
        </div>
      )}
    </Card>
  );
};

export default EventsList;