import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  description: string;
}

// Sample events data
const events: Event[] = [
  {
    id: '1',
    title: 'Orientation Day',
    date: new Date(2023, 7, 20), // August 20, 2023
    time: '9:00 AM - 3:00 PM',
    location: 'Main Campus Auditorium',
    category: 'Academic',
    description: 'Welcome event for all new students joining the upcoming academic year.'
  },
  {
    id: '2',
    title: 'Guest Lecture: Future of AI',
    date: new Date(2023, 8, 5), // September 5, 2023
    time: '2:00 PM - 4:00 PM',
    location: 'CS Department Hall',
    category: 'Lecture',
    description: 'Distinguished lecture by Dr. James Peterson on artificial intelligence advancements.'
  },
  {
    id: '3',
    title: 'Alumni Networking Event',
    date: new Date(2023, 9, 15), // October 15, 2023
    time: '6:00 PM - 9:00 PM',
    location: 'Campus Pavilion',
    category: 'Networking',
    description: 'Connect with alumni and industry professionals for career opportunities.'
  },
  {
    id: '4',
    title: 'Mid-Term Exams',
    date: new Date(2023, 10, 1), // November 1, 2023
    time: 'As per schedule',
    location: 'All Campus Buildings',
    category: 'Exam',
    description: 'Mid-semester examinations for all courses and departments.'
  },
  {
    id: '5',
    title: 'Sports Day',
    date: new Date(2023, 10, 20), // November 20, 2023
    time: '10:00 AM - 5:00 PM',
    location: 'University Sports Complex',
    category: 'Sports',
    description: 'Annual sports competition between departments.'
  },
  {
    id: '6',
    title: 'Research Symposium',
    date: new Date(2023, 11, 5), // December 5, 2023
    time: '9:00 AM - 4:00 PM',
    location: 'Research Center',
    category: 'Research',
    description: 'Showcase of research projects from faculty and graduate students.'
  }
];

const categoryColors: Record<string, string> = {
  'Academic': 'bg-blue-100 text-blue-800',
  'Lecture': 'bg-purple-100 text-purple-800',
  'Networking': 'bg-green-100 text-green-800',
  'Exam': 'bg-red-100 text-red-800',
  'Sports': 'bg-orange-100 text-orange-800',
  'Research': 'bg-teal-100 text-teal-800'
};

const EventsCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState('upcoming');
  
  const today = new Date();
  
  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const pastEvents = events
    .filter(event => event.date < today)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
    
  const daysWithEvents = events.map(event => event.date);
  
  const selectedDateEvents = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-school-primary mb-2">Events Calendar</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with all the academic and extracurricular events happening at our institution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              {date ? format(date, 'MMMM yyyy') : 'Select a date'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                highlighted: daysWithEvents.map(date => new Date(date))
              }}
              modifiersStyles={{
                highlighted: { fontWeight: 'bold', backgroundColor: 'rgba(0, 120, 255, 0.1)' }
              }}
            />
          </CardContent>
        </Card>

        {/* Events List */}
        <Card className="lg:col-span-2">
          <CardHeader className="px-6">
            <div className="flex justify-between items-center">
              <CardTitle>Events</CardTitle>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} defaultValue={selectedTab}>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
              
                <TabsContent value="upcoming">
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-5">
                      {upcomingEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>No upcoming events scheduled</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="today">
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-5">
                      {selectedDateEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>No events for {date ? format(date, 'MMMM d, yyyy') : 'selected date'}</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past">
                  {pastEvents.length > 0 ? (
                    <div className="space-y-5">
                      {pastEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>No past events</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {/* The TabsContent has been moved inside the Tabs component above */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  const colorClass = categoryColors[event.category] || 'bg-gray-100 text-gray-800';
  
  return (
    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-school-primary">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-school-primary">{event.title}</h3>
            <p className="text-gray-500 text-sm">{format(event.date, 'MMMM d, yyyy')}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full mt-2 md:mt-0 inline-block ${colorClass}`}>
            {event.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-school-secondary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-school-secondary" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCalendar;
