
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

// Sample courses data - in a real app this would come from an API
const courses = [
  { 
    id: '1', 
    code: 'CS101', 
    name: 'Introduction to Computer Science', 
    students: 45,
    progress: 65,
    nextClass: 'Monday, 10:00 AM - Lab 3'
  },
  { 
    id: '2', 
    code: 'CS205', 
    name: 'Data Structures and Algorithms', 
    students: 38,
    progress: 48,
    nextClass: 'Tuesday, 2:00 PM - Room 201'
  },
  { 
    id: '3', 
    code: 'CS310', 
    name: 'Database Systems', 
    students: 32,
    progress: 75,
    nextClass: 'Thursday, 11:30 AM - Lab 2'
  },
  { 
    id: '4', 
    code: 'CS405', 
    name: 'Artificial Intelligence', 
    students: 25,
    progress: 40,
    nextClass: 'Wednesday, 3:00 PM - Room 105'
  }
];

interface CoursesOverviewProps {
  onSelectCourse: (courseCode: string) => void;
}

const CoursesOverview: React.FC<CoursesOverviewProps> = ({ onSelectCourse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{course.code}</CardTitle>
              <span className="text-xs bg-gray-100 rounded-full px-2 py-1">
                {course.students} students
              </span>
            </div>
            <CardDescription className="text-base font-medium">
              {course.name}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-2 h-4 w-4 text-school-secondary" />
                <span>Next: {course.nextClass}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-gray-200 hover:border-school-secondary hover:text-school-secondary"
                  onClick={() => onSelectCourse(course.code)}
                >
                  View Students
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-gray-200 hover:border-school-secondary hover:text-school-secondary"
                  onClick={() => onSelectCourse(course.code)}
                >
                  Materials
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CoursesOverview;
