
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'New Computer Science Program Launched',
    excerpt: 'The school has launched a new cutting-edge Computer Science program focusing on AI and machine learning.',
    date: 'June 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095',
    category: 'Academic'
  },
  {
    id: 2,
    title: 'Annual Sports Competition Results',
    excerpt: 'Congratulations to all participants in our annual inter-department sports competition.',
    date: 'May 22, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
    category: 'Sports'
  },
  {
    id: 3,
    title: 'Student Research Symposium',
    excerpt: 'Join us for the upcoming student research symposium showcasing innovative projects across all disciplines.',
    date: 'July 8, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e',
    category: 'Research'
  }
];

const NewsHighlights = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-school-primary mb-2">Latest News</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings, announcements, and achievements at our institution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="news-card overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src={`${item.imageUrl}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80`} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium px-2 py-1 bg-school-primary/10 rounded text-school-primary">
                    {item.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.date}
                  </div>
                </div>
                <CardTitle className="text-xl text-school-primary">{item.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600">{item.excerpt}</p>
              </CardContent>
              
              <CardFooter>
                <Button asChild variant="ghost" className="text-school-primary hover:text-school-primary/90 p-0">
                  <Link to={`/news/${item.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-school-primary text-school-primary hover:bg-school-primary hover:text-white transition-colors">
            <Link to="/events">View All News</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsHighlights;
