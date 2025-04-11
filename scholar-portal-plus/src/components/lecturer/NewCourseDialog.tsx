
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NewCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: CourseData) => void;
}

interface CourseData {
  code: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
}

const NewCourseDialog: React.FC<NewCourseDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const [courseData, setCourseData] = useState<CourseData>({
    code: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    maxStudents: 50
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [id.replace('course-', '')]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(courseData);
    setCourseData({
      code: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      maxStudents: 50
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course-code">Course Code</Label>
              <Input 
                id="course-code" 
                placeholder="E.g., CS101" 
                value={courseData.code}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-name">Course Name</Label>
              <Input 
                id="course-name" 
                placeholder="E.g., Introduction to Computer Science" 
                value={courseData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-description">Course Description</Label>
            <Textarea 
              id="course-description" 
              placeholder="Provide a brief description of the course" 
              value={courseData.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course-startDate">Start Date</Label>
              <Input 
                id="course-startDate" 
                type="date" 
                value={courseData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-endDate">End Date</Label>
              <Input 
                id="course-endDate" 
                type="date" 
                value={courseData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-maxStudents">Maximum Students</Label>
            <Input 
              id="course-maxStudents" 
              type="number" 
              min="1" 
              value={courseData.maxStudents}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Course Settings</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="setting-visible" className="mr-2" />
                <label htmlFor="setting-visible" className="text-sm">Make course visible to students</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="setting-enrollment" className="mr-2" />
                <label htmlFor="setting-enrollment" className="text-sm">Allow student enrollment</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="setting-materials" className="mr-2" />
                <label htmlFor="setting-materials" className="text-sm">Allow access to course materials</label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-school-secondary hover:bg-school-secondary/90" onClick={handleSubmit}>Create Course</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCourseDialog;
