
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section flex items-center text-white relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
      }}>
      <div className="container mx-auto px-4 py-20 z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Scholar Portal</h1>
          <p className="text-xl mb-8">
            Empowering students and faculty with tools and resources for academic excellence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-school-accent text-school-primary hover:bg-school-accent/90">
              <Link to="/login?role=student">Student Portal</Link>
            </Button>
            <Button asChild size="lg" className="bg:transparent border-white text-white hover:bg-white/10">
              <Link to="/login?role=lecturer">Lecturer Portal</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
