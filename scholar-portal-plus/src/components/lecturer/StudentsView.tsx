
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

// Sample students data - in a real app this would come from an API
const students = [
  {
    id: 'ST1001',
    name: 'Alice Johnson',
    email: 'alice.j@student.example.edu',
    program: 'Computer Science',
    courseCode: 'CS101',
    attendance: 90,
    submittedAssignments: 7,
    totalAssignments: 8
  },
  {
    id: 'ST1002',
    name: 'Bob Smith',
    email: 'bob.s@student.example.edu',
    program: 'Computer Science',
    courseCode: 'CS101',
    attendance: 85,
    submittedAssignments: 6,
    totalAssignments: 8
  },
  {
    id: 'ST1003',
    name: 'Carol Davis',
    email: 'carol.d@student.example.edu',
    program: 'Information Technology',
    courseCode: 'CS101',
    attendance: 95,
    submittedAssignments: 8,
    totalAssignments: 8
  },
  {
    id: 'ST1015',
    name: 'David Wilson',
    email: 'david.w@student.example.edu',
    program: 'Computer Engineering',
    courseCode: 'CS205',
    attendance: 80,
    submittedAssignments: 5,
    totalAssignments: 7
  },
  {
    id: 'ST1023',
    name: 'Emma Brown',
    email: 'emma.b@student.example.edu',
    program: 'Computer Science',
    courseCode: 'CS205',
    attendance: 92,
    submittedAssignments: 7,
    totalAssignments: 7
  }
];

interface StudentsViewProps {
  selectedCourse: string | null;
  onClearFilter: () => void;
}

const StudentsView: React.FC<StudentsViewProps> = ({ selectedCourse, onClearFilter }) => {
  const filteredStudents = selectedCourse 
    ? students.filter(student => student.courseCode === selectedCourse)
    : students;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-school-secondary">Student Activity</h2>
          {selectedCourse && (
            <p className="text-gray-600">Filtered by: {selectedCourse}</p>
          )}
        </div>
        
        <div className="mt-2 md:mt-0 flex gap-2">
          <Button variant="outline" onClick={onClearFilter}>
            {selectedCourse ? 'Show All' : 'All Courses'}
          </Button>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="py-3 px-4 font-medium">Student ID</th>
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Course</th>
                  <th className="py-3 px-4 font-medium">Attendance</th>
                  <th className="py-3 px-4 font-medium">Assignments</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-500">{student.id}</td>
                    <td className="py-3 px-4 font-medium">
                      <div>{student.name}</div>
                      <div className="text-xs text-gray-500">{student.email}</div>
                    </td>
                    <td className="py-3 px-4">{student.courseCode}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-2 ${
                          student.attendance >= 90 ? 'bg-green-500' : 
                          student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span>{student.attendance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span>{student.submittedAssignments}/{student.totalAssignments}</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-school-secondary h-1.5 rounded-full" 
                            style={{ width: `${(student.submittedAssignments / student.totalAssignments) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentsView;
