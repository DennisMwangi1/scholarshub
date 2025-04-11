
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/Home/Hero';
import NewsHighlights from '@/components/Home/NewsHighlights';
import EventsPreview from '@/components/Home/EventsPreview';
import ApplicationForm from '@/components/Home/ApplicationForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <NewsHighlights />
        <EventsPreview />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
