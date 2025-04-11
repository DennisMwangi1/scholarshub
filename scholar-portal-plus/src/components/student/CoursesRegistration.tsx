
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  status: 'registered' | 'pending' | 'not-registered';
  seats: number;
  schedule: string;
}

// Sample courses data
const coursesData: Course[] = [
  { 
    id: '1', 
    code: 'CS101', 
    name: 'Introduction to Computer Science', 
    instructor: 'Dr. Smith',
    credits: 3,
    status: 'registered',
    seats: 45,
    schedule: 'Mon, Wed 10:00-11:30 AM'
  },
  { 
    id: '2', 
    code: 'MATH201', 
    name: 'Calculus II', 
    instructor: 'Prof. Johnson',
    credits: 4,
    status: 'registered',
    seats: 35,
    schedule: 'Tue, Thu 2:00-3:30 PM'
  },
  { 
    id: '3', 
    code: 'ENG105', 
    name: 'Academic Writing', 
    instructor: 'Dr. Williams',
    credits: 3,
    status: 'registered',
    seats: 30,
    schedule: 'Wed, Fri 1:00-2:30 PM'
  },
  { 
    id: '4', 
    code: 'PHYS101', 
    name: 'Introduction to Physics', 
    instructor: 'Dr. Brown',
    credits: 4,
    status: 'registered',
    seats: 40,
    schedule: 'Mon, Wed 3:00-4:30 PM'
  },
  { 
    id: '5', 
    code: 'CHEM101', 
    name: 'General Chemistry', 
    instructor: 'Prof. Davis',
    credits: 4,
    status: 'not-registered',
    seats: 25,
    schedule: 'Tue, Thu 10:00-11:30 AM'
  },
  { 
    id: '6', 
    code: 'BIO101', 
    name: 'Introduction to Biology', 
    instructor: 'Dr. Miller',
    credits: 3,
    status: 'not-registered',
    seats: 20,
    schedule: 'Mon, Wed 1:00-2:30 PM'
  }
];

const CoursesRegistration = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [currentCredits, setCurrentCredits] = useState<number>(14);
  const maxCredits = 18;

  const handleRegister = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    
    // Check credit limit
    if (currentCredits + course.credits > maxCredits) {
      toast({
        variant: "destructive",
        title: "Credit limit exceeded",
        description: `You can register for a maximum of ${maxCredits} credits this semester.`
      });
      return;
    }
    
    setCourses(prevCourses => 
      prevCourses.map(c => 
        c.id === id ? { ...c, status: 'registered' } : c
      )
    );
    
    setCurrentCredits(prev => prev + course.credits);
    
    toast({
      title: "Course registered",
      description: `You have successfully registered for ${course.code}: ${course.name}.`
    });
  };
  
  const handleDrop = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    
    setCourses(prevCourses => 
      prevCourses.map(c => 
        c.id === id ? { ...c, status: 'not-registered' } : c
      )
    );
    
    setCurrentCredits(prev => prev - course.credits);
    
    toast({
      title: "Course dropped",
      description: `You have dropped ${course.code}: ${course.name}.`
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-school-primary mb-4">Course Registration</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Registration Status</CardTitle>
          <CardDescription>Current registration period: Fall 2023 semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <p>Registration is open</p>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium">Current Credits</p>
              <div className="text-2xl font-bold text-school-primary">
                {currentCredits}/{maxCredits}
              </div>
            </div>
            <div className="w-full max-w-xs bg-gray-200 h-2 rounded-full overflow-hidden ml-4">
              <div 
                className="bg-school-primary h-full rounded-full" 
                style={{ width: `${(currentCredits / maxCredits) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mt-3">
            <Clock className="mr-2 h-4 w-4" />
            <p>Registration closes in 7 days</p>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-semibold mb-3">Available Courses</h3>
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1 mb-3 lg:mb-0">
                  <h4 className="font-medium text-lg">{course.code}: {course.name}</h4>
                  <p className="text-gray-500 text-sm">{course.instructor} • {course.credits} credits</p>
                  <p className="text-gray-500 text-sm mt-1">
                    <span className="inline-flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {course.schedule}
                    </span>
                    <span className="ml-3">{course.seats} seats available</span>
                  </p>
                </div>
                
                <div className="flex items-center">
                  {course.status === 'registered' ? (
                    <Button 
                      onClick={() => handleDrop(course.id)}
                      variant="outline" 
                      className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800"
                    >
                      <X className="mr-1 h-4 w-4" /> Drop Course
                    </Button>
                  ) : course.status === 'pending' ? (
                    <Button variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800">
                      Pending Approval
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleRegister(course.id)}
                      className="bg-school-primary hover:bg-school-primary/90"
                    >
                      <Check className="mr-1 h-4 w-4" /> Register
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesRegistration;
