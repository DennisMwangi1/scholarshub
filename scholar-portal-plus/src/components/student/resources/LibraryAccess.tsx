
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Library, Search, Clock, BookOpen, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LibraryAccess = () => {
  const navigate = useNavigate();

  const libraries = [
    {
      name: "Main Library",
      description: "The central library housing the majority of our collections.",
      hours: "8:00 AM - 10:00 PM (Mon-Fri), 10:00 AM - 6:00 PM (Sat-Sun)",
      collections: ["General Collection", "Reference Materials", "Periodicals", "Special Collections"],
      facilities: ["Study Rooms", "Computer Lab", "Printing Services", "Multimedia Center"]
    },
    {
      name: "Science & Technology Library",
      description: "Specialized collections for science and engineering disciplines.",
      hours: "8:00 AM - 9:00 PM (Mon-Fri), 10:00 AM - 5:00 PM (Sat), Closed (Sun)",
      collections: ["Science Journals", "Technical Resources", "Engineering Standards", "Computer Science Collection"],
      facilities: ["Technical Lab", "3D Printing", "Study Pods", "Conference Room"]
    },
    {
      name: "Arts & Humanities Library",
      description: "Collections focused on literature, arts, and humanities.",
      hours: "9:00 AM - 8:00 PM (Mon-Fri), 11:00 AM - 4:00 PM (Sat), Closed (Sun)",
      collections: ["Literature", "Arts & Music", "Philosophy", "Historical Archives"],
      facilities: ["Quiet Reading Room", "Audio Listening Stations", "Exhibition Space"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-school-primary"
          onClick={() => navigate('/student-portal')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-school-primary mb-6">Library Access</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Library className="h-5 w-5 text-school-primary" />
            Library Services Overview
          </CardTitle>
          <CardDescription>
            Your student ID gives you access to all campus libraries and online resources.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            As a registered student, you have full access to our library system, which includes multiple physical locations
            and a comprehensive digital library. Your student ID card serves as your library card.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
              <Search className="h-8 w-8 text-school-primary mb-2" />
              <h3 className="font-medium text-center">Online Catalog</h3>
              <p className="text-sm text-center text-gray-500">Search for books, journals, and digital resources</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
              <BookOpen className="h-8 w-8 text-school-primary mb-2" />
              <h3 className="font-medium text-center">Digital Resources</h3>
              <p className="text-sm text-center text-gray-500">Access e-books, journals, and research databases</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
              <Calendar className="h-8 w-8 text-school-primary mb-2" />
              <h3 className="font-medium text-center">Reserve Resources</h3>
              <p className="text-sm text-center text-gray-500">Book study rooms and reserve course materials</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Our Libraries</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraries.map((library, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{library.name}</CardTitle>
              <CardDescription>{library.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 font-medium mb-1">
                    <Clock className="h-4 w-4 text-school-primary" />
                    Hours
                  </h3>
                  <p className="text-sm">{library.hours}</p>
                </div>
                
                <div>
                  <h3 className="flex items-center gap-2 font-medium mb-1">
                    <BookOpen className="h-4 w-4 text-school-primary" />
                    Collections
                  </h3>
                  <ul className="text-sm list-disc list-inside">
                    {library.collections.map((collection, i) => (
                      <li key={i}>{collection}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="flex items-center gap-2 font-medium mb-1">
                    <Search className="h-4 w-4 text-school-primary" />
                    Facilities
                  </h3>
                  <ul className="text-sm list-disc list-inside">
                    {library.facilities.map((facility, i) => (
                      <li key={i}>{facility}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Accessing Online Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Our digital library provides access to thousands of e-books, journals, and research databases. You can access these resources from anywhere with your student credentials.</p>
          <Button>
            Access Digital Library Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryAccess;
