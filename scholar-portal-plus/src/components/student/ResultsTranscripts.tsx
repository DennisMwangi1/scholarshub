
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, ChevronDown, ChevronUp, Printer } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CourseResult {
  id: string;
  courseCode: string;
  courseName: string;
  semester: string;
  grade: string;
  points: number;
  credits: number;
}

interface Semester {
  id: string;
  name: string;
  year: string;
  gpa: number;
  courses: CourseResult[];
}

// Sample results data
const semestersData: Semester[] = [
  {
    id: '1',
    name: 'Fall',
    year: '2022',
    gpa: 3.7,
    courses: [
      {
        id: '1',
        courseCode: 'CS100',
        courseName: 'Computer Science Fundamentals',
        semester: 'Fall 2022',
        grade: 'A',
        points: 4.0,
        credits: 3
      },
      {
        id: '2',
        courseCode: 'MATH100',
        courseName: 'Calculus I',
        semester: 'Fall 2022',
        grade: 'A-',
        points: 3.7,
        credits: 4
      },
      {
        id: '3',
        courseCode: 'ENG100',
        courseName: 'Composition',
        semester: 'Fall 2022',
        grade: 'B+',
        points: 3.3,
        credits: 3
      },
      {
        id: '4',
        courseCode: 'HIST101',
        courseName: 'Western Civilization',
        semester: 'Fall 2022',
        grade: 'A',
        points: 4.0,
        credits: 3
      }
    ]
  },
  {
    id: '2',
    name: 'Spring',
    year: '2023',
    gpa: 3.8,
    courses: [
      {
        id: '5',
        courseCode: 'CS200',
        courseName: 'Data Structures',
        semester: 'Spring 2023',
        grade: 'A',
        points: 4.0,
        credits: 3
      },
      {
        id: '6',
        courseCode: 'MATH200',
        courseName: 'Linear Algebra',
        semester: 'Spring 2023',
        grade: 'A',
        points: 4.0,
        credits: 3
      },
      {
        id: '7',
        courseCode: 'PHYS101',
        courseName: 'Physics I',
        semester: 'Spring 2023',
        grade: 'B+',
        points: 3.3,
        credits: 4
      },
      {
        id: '8',
        courseCode: 'SOC101',
        courseName: 'Introduction to Sociology',
        semester: 'Spring 2023',
        grade: 'A-',
        points: 3.7,
        credits: 3
      }
    ]
  },
  {
    id: '3',
    name: 'Fall',
    year: '2023',
    gpa: 3.6,
    courses: [
      {
        id: '9',
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        semester: 'Fall 2023',
        grade: 'In Progress',
        points: 0,
        credits: 3
      },
      {
        id: '10',
        courseCode: 'MATH201',
        courseName: 'Calculus II',
        semester: 'Fall 2023',
        grade: 'In Progress',
        points: 0,
        credits: 4
      },
      {
        id: '11',
        courseCode: 'ENG105',
        courseName: 'Academic Writing',
        semester: 'Fall 2023',
        grade: 'In Progress',
        points: 0,
        credits: 3
      },
      {
        id: '12',
        courseCode: 'PHYS101',
        courseName: 'Introduction to Physics',
        semester: 'Fall 2023',
        grade: 'In Progress',
        points: 0,
        credits: 4
      }
    ]
  }
];

// Grade to GPA point mapping
const gradeToPoints: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0
};

const ResultsTranscripts = () => {
  const [openSemesters, setOpenSemesters] = useState<string[]>(['3']); // Start with current semester open
  
  const toggleSemester = (id: string) => {
    setOpenSemesters(prev => 
      prev.includes(id) 
        ? prev.filter(semId => semId !== id)
        : [...prev, id]
    );
  };
  
  // Calculate cumulative GPA
  const calculateCumulativeGPA = () => {
    const completedSemesters = semestersData.filter(sem => 
      sem.courses.some(course => course.grade !== 'In Progress')
    );
    
    const totalPoints = completedSemesters.reduce((sum, semester) => {
      const semesterPoints = semester.courses
        .filter(course => course.grade !== 'In Progress')
        .reduce((acc, course) => acc + (course.points * course.credits), 0);
      return sum + semesterPoints;
    }, 0);
    
    const totalCredits = completedSemesters.reduce((sum, semester) => {
      const semesterCredits = semester.courses
        .filter(course => course.grade !== 'In Progress')
        .reduce((acc, course) => acc + course.credits, 0);
      return sum + semesterCredits;
    }, 0);
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
  };

  // Generate transcript PDF (simulation)
  const downloadTranscript = () => {
    // In a real app, this would generate and download a PDF
    alert('Transcript downloading...');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-school-primary mb-4">Academic Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cumulative GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-school-primary">{calculateCumulativeGPA()}</div>
            <p className="text-gray-500 text-sm">Overall Performance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Credits Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-school-primary">26</div>
            <p className="text-gray-500 text-sm">Out of 120 Required</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Graduation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-school-primary">22%</div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-school-primary h-2 rounded-full" style={{ width: '22%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Semester Results</h3>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={downloadTranscript}>
            <Download className="mr-2 h-4 w-4" />
            Download Transcript
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {semestersData.map(semester => (
          <Card key={semester.id}>
            <Collapsible open={openSemesters.includes(semester.id)} onOpenChange={() => {}}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer" onClick={() => toggleSemester(semester.id)}>
                  <div className="flex justify-between items-center">
                    <CardTitle>{semester.name} {semester.year}</CardTitle>
                    <div className="flex items-center">
                      <div className="mr-4 text-right">
                        <span className="text-sm text-gray-500">GPA:</span>
                        <span className="ml-1 font-bold">{semester.gpa.toFixed(1)}</span>
                      </div>
                      {openSemesters.includes(semester.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead className="text-center">Credits</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                        <TableHead className="text-center">GPA Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semester.courses.map(course => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.courseCode}</TableCell>
                          <TableCell>{course.courseName}</TableCell>
                          <TableCell className="text-center">{course.credits}</TableCell>
                          <TableCell className="text-center">
                            <span 
                              className={`px-2 py-1 rounded ${
                                course.grade === 'In Progress' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : course.grade.startsWith('A') 
                                    ? 'bg-green-100 text-green-800'
                                    : course.grade.startsWith('B')
                                      ? 'bg-blue-100 text-blue-800'
                                      : course.grade.startsWith('C')
                                        ? 'bg-orange-100 text-orange-800'
                                        : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {course.grade}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {course.grade === 'In Progress' ? '-' : course.points.toFixed(1)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="flex justify-between items-center mt-4 border-t pt-4">
                    <div>
                      <span className="text-sm text-gray-500">Total Credits:</span>
                      <span className="ml-1 font-medium">
                        {semester.courses.reduce((sum, course) => sum + course.credits, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Semester GPA:</span>
                      <span className="ml-1 font-medium">
                        {semester.gpa.toFixed(2)}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultsTranscripts;
