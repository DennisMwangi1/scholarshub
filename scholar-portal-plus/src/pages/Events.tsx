
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventsCalendar from '@/components/shared/EventsCalendar';

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <EventsCalendar />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
