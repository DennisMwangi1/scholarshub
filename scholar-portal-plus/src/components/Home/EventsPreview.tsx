
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Orientation Day',
    date: 'August 20, 2023',
    time: '9:00 AM - 3:00 PM',
    location: 'Main Campus Auditorium',
    description: 'Welcome event for all new students joining the upcoming academic year.'
  },
  {
    id: 2,
    title: 'Guest Lecture: Future of AI',
    date: 'September 5, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'CS Department Hall',
    description: 'Distinguished lecture by Dr. James Peterson on artificial intelligence advancements.'
  },
  {
    id: 3,
    title: 'Alumni Networking Event',
    date: 'October 15, 2023',
    time: '6:00 PM - 9:00 PM',
    location: 'Campus Pavilion',
    description: 'Connect with alumni and industry professionals for career opportunities.'
  },
  {
    id: 4,
    title: 'Mid-Term Exams',
    date: 'November 1-10, 2023',
    time: 'As per schedule',
    location: 'All Campus Buildings',
    description: 'Mid-semester examinations for all courses and departments.'
  }
];

const EventsPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-school-primary mb-2">Upcoming Events</h2>
            <p className="text-gray-600">
              Mark your calendar for these important upcoming events at our institution.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0 border-school-primary text-school-primary hover:bg-school-primary hover:text-white">
            <Link to="/events">View Full Calendar</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-school-secondary">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-school-primary">{event.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-school-secondary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-school-secondary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-school-secondary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="mt-3 text-gray-600">{event.description}</p>
              </CardContent>
              
              <CardFooter>
                <Button asChild variant="ghost" className="text-school-primary hover:text-school-primary/90 p-0">
                  <Link to={`/events/${event.id}`}>Event Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
