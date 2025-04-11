
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  progress: number;
}

// Sample courses data
const courses: Course[] = [
  { 
    id: '1', 
    code: 'CS101', 
    name: 'Introduction to Computer Science', 
    instructor: 'Dr. Smith',
    credits: 3,
    progress: 65
  },
  { 
    id: '2', 
    code: 'MATH201', 
    name: 'Calculus II', 
    instructor: 'Prof. Johnson',
    credits: 4,
    progress: 78
  },
  { 
    id: '3', 
    code: 'ENG105', 
    name: 'Academic Writing', 
    instructor: 'Dr. Williams',
    credits: 3,
    progress: 92
  },
  { 
    id: '4', 
    code: 'PHYS101', 
    name: 'Introduction to Physics', 
    instructor: 'Dr. Brown',
    credits: 4,
    progress: 50
  }
];

const CoursesOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-school-primary mb-4">Academic Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-school-primary">14/18</div>
            <p className="text-gray-500 text-sm">Current Semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-school-primary">3.7</div>
            <p className="text-gray-500 text-sm">Cumulative</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-school-primary">92%</div>
            <p className="text-gray-500 text-sm">This Semester</p>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold mb-3">Current Courses</h3>
      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-2 md:mb-0">
                  <h4 className="font-medium text-lg">{course.code}: {course.name}</h4>
                  <p className="text-gray-500">{course.instructor} • {course.credits} credits</p>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesOverview;
