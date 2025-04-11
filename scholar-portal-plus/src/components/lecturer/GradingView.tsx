
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Download, FilePlus, Upload } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

// Sample assignments data - in a real app this would come from an API
const initialAssignments = [
  {
    id: 'A001',
    courseCode: 'CS101',
    title: 'Assignment 1: Basic Programming Concepts',
    dueDate: 'June 20, 2023',
    maxScore: 100,
    submissions: 32,
    graded: 28,
    averageScore: 78
  },
  {
    id: 'A002',
    courseCode: 'CS101',
    title: 'Quiz 1: Variables and Data Types',
    dueDate: 'June 15, 2023',
    maxScore: 50,
    submissions: 42,
    graded: 42,
    averageScore: 41
  },
  {
    id: 'A003',
    courseCode: 'CS205',
    title: 'Assignment 1: Array Implementation',
    dueDate: 'June 25, 2023',
    maxScore: 100,
    submissions: 28,
    graded: 15,
    averageScore: 82
  },
  {
    id: 'A004',
    courseCode: 'CS310',
    title: 'Assignment 1: ER Diagrams',
    dueDate: 'June 22, 2023',
    maxScore: 100,
    submissions: 30,
    graded: 0,
    averageScore: 0
  }
];

// Sample student grades for when a specific assignment is selected
const sampleGrades = [
  { studentId: 'ST1001', name: 'Alice Johnson', score: 92, status: 'Graded', feedback: 'Excellent work on problem 3!' },
  { studentId: 'ST1002', name: 'Bob Smith', score: 78, status: 'Graded', feedback: 'Good effort, review section 2.1' },
  { studentId: 'ST1003', name: 'Carol Davis', score: 85, status: 'Graded', feedback: 'Well structured solution' },
  { studentId: 'ST1015', name: 'David Wilson', score: null, status: 'Not Submitted', feedback: '' },
  { studentId: 'ST1023', name: 'Emma Brown', score: null, status: 'Submitted', feedback: '' },
];

interface GradingViewProps {
  selectedCourse: string | null;
  onClearFilter: () => void;
}

const GradingView: React.FC<GradingViewProps> = ({ selectedCourse, onClearFilter }) => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isGradingDialogOpen, setIsGradingDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [studentGrades, setStudentGrades] = useState(sampleGrades);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    courseCode: selectedCourse || '',
    dueDate: '',
    maxScore: 100,
    instructions: ''
  });
  const { toast } = useToast();

  const filteredAssignments = selectedCourse
    ? assignments.filter(assignment => assignment.courseCode === selectedCourse)
    : assignments;

  // Update a student's grade in the sample data
  const updateGrade = (studentId: string, score: number, feedback: string) => {
    setStudentGrades(
      studentGrades.map(student => 
        student.studentId === studentId 
          ? { ...student, score, status: 'Graded', feedback } 
          : student
      )
    );
    
    toast({
      title: "Grade updated",
      description: "Student's grade has been saved successfully"
    });
  };

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.courseCode || !newAssignment.dueDate) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields"
      });
      return;
    }
    
    // In a real app, this would be an API call to create the assignment
    const newAssignmentItem = {
      id: `A${Math.floor(Math.random() * 1000)}`,
      courseCode: newAssignment.courseCode,
      title: newAssignment.title,
      dueDate: newAssignment.dueDate,
      maxScore: newAssignment.maxScore,
      submissions: 0,
      graded: 0,
      averageScore: 0
    };

    setAssignments([...assignments, newAssignmentItem]);
    setIsCreateDialogOpen(false);
    setNewAssignment({
      title: '',
      courseCode: selectedCourse || '',
      dueDate: '',
      maxScore: 100,
      instructions: ''
    });

    toast({
      title: "Assignment created",
      description: "New assignment has been created successfully"
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-school-secondary">Grading & Assignments</h2>
          {selectedCourse && (
            <p className="text-gray-600">Filtered by: {selectedCourse}</p>
          )}
        </div>
        
        <div className="mt-2 md:mt-0 flex gap-2">
          <Button variant="outline" onClick={onClearFilter}>
            {selectedCourse ? 'Show All' : 'All Courses'}
          </Button>
          <Button 
            className="bg-school-secondary hover:bg-school-secondary/90"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>
      </div>
      
      {!selectedAssignment ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Grading Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.courseCode}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>{assignment.submissions} / 45</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-school-secondary h-2 rounded-full" 
                              style={{ width: `${(assignment.graded / assignment.submissions) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {assignment.graded}/{assignment.submissions}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-8"
                            onClick={() => {
                              setSelectedAssignment(assignment.id);
                              setIsGradingDialogOpen(true);
                            }}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Grade
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                      <p className="mb-2">No assignments found</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsCreateDialogOpen(true)}
                      >
                        <FilePlus className="mr-2 h-4 w-4" />
                        Create Assignment
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedAssignment(null)}
            >
              Back to Assignments
            </Button>
            <Button>Download All Submissions</Button>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-4">
                {assignments.find(a => a.id === selectedAssignment)?.title}
              </h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentGrades.map((student) => (
                    <TableRow key={student.studentId}>
                      <TableCell>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.studentId}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          student.status === 'Graded' 
                            ? 'bg-green-100 text-green-800' 
                            : student.status === 'Submitted' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {student.score !== null 
                          ? `${student.score}/${assignments.find(a => a.id === selectedAssignment)?.maxScore}`
                          : '-'
                        }
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {student.feedback || '-'}
                      </TableCell>
                      <TableCell>
                        {student.status !== 'Not Submitted' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8">
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8"
                              disabled={student.status === 'Not Submitted'}
                              onClick={() => {
                                const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-99
                                updateGrade(student.studentId, score, "Good work on this assignment.");
                              }}
                            >
                              Grade
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Assignment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="assignment-title">Title</Label>
              <Input 
                id="assignment-title" 
                placeholder="E.g., Assignment 1: Introduction to Algorithms" 
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-course">Course</Label>
              <select 
                id="assignment-course"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newAssignment.courseCode}
                onChange={(e) => setNewAssignment({...newAssignment, courseCode: e.target.value})}
              >
                <option value="" disabled>Select a course</option>
                <option value="CS101">CS101 - Introduction to Computer Science</option>
                <option value="CS205">CS205 - Data Structures and Algorithms</option>
                <option value="CS310">CS310 - Database Systems</option>
                <option value="CS405">CS405 - Artificial Intelligence</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-date">Due Date</Label>
              <Input 
                id="assignment-date" 
                type="date" 
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-score">Maximum Score</Label>
              <Input 
                id="assignment-score" 
                type="number" 
                min="0"
                value={newAssignment.maxScore}
                onChange={(e) => setNewAssignment({...newAssignment, maxScore: parseInt(e.target.value, 10)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-instructions">Instructions</Label>
              <textarea 
                id="assignment-instructions"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Detailed instructions for students..."
                value={newAssignment.instructions}
                onChange={(e) => setNewAssignment({...newAssignment, instructions: e.target.value})}
              ></textarea>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-file">Upload Attachment (Optional)</Label>
              <Input id="assignment-file" type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button className="bg-school-secondary hover:bg-school-secondary/90" onClick={handleCreateAssignment}>Create Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GradingView;
