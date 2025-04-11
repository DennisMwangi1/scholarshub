
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, File, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Material {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  uploadedBy: string;
  date: string;
  fileSize: string;
  fileType: string;
  description?: string;
}

// Sample materials data
const materialsData: Material[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    uploadedBy: 'Dr. Smith',
    date: 'June 10, 2023',
    fileSize: '2.3 MB',
    fileType: 'PDF',
    description: 'Overview of basic algorithmic concepts and problem-solving approaches.'
  },
  {
    id: '2',
    title: 'Week 3 Lecture Notes',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    uploadedBy: 'Dr. Smith',
    date: 'June 12, 2023',
    fileSize: '1.5 MB',
    fileType: 'PDF',
    description: 'Lecture notes covering data types and basic programming concepts.'
  },
  {
    id: '3',
    title: 'Assignment 2 Instructions',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    uploadedBy: 'Prof. Johnson',
    date: 'June 15, 2023',
    fileSize: '850 KB',
    fileType: 'DOCX',
    description: 'Detailed instructions for completing the second calculus assignment.'
  },
  {
    id: '4',
    title: 'Research Paper Guidelines',
    courseCode: 'ENG105',
    courseName: 'Academic Writing',
    uploadedBy: 'Dr. Williams',
    date: 'June 8, 2023',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    description: 'Guidelines for formatting and structuring academic research papers.'
  },
  {
    id: '5',
    title: 'Lab Experiment 3 Instructions',
    courseCode: 'PHYS101',
    courseName: 'Introduction to Physics',
    uploadedBy: 'Dr. Brown',
    date: 'June 14, 2023',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    description: 'Step-by-step instructions for completing the third physics lab experiment.'
  },
  {
    id: '6',
    title: 'Midterm Study Guide',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    uploadedBy: 'Dr. Smith',
    date: 'June 20, 2023',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    description: 'Comprehensive study guide covering all midterm exam topics.'
  },
  {
    id: '7',
    title: 'Limits and Continuity Lecture Slides',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    uploadedBy: 'Prof. Johnson',
    date: 'June 17, 2023',
    fileSize: '4.2 MB',
    fileType: 'PPTX',
    description: 'Lecture slides on limits, continuity, and their applications.'
  }
];

const getFileIcon = (fileType: string) => {
  switch(fileType.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-6 w-6 text-red-500" />;
    case 'docx':
      return <FileText className="h-6 w-6 text-blue-500" />;
    case 'pptx':
      return <FileText className="h-6 w-6 text-orange-500" />;
    default:
      return <File className="h-6 w-6 text-gray-500" />;
  }
};

const LearningMaterials = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const courses = Array.from(new Set(materialsData.map(m => m.courseCode)));

  // Filter materials based on selected course and search query
  const filteredMaterials = materialsData.filter(material => {
    const matchesCourse = selectedCourse === 'all' || material.courseCode === selectedCourse;
    const matchesSearch = 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCourse && matchesSearch;
  });

  const handleDownload = (material: Material) => {
    // In a real app, this would trigger a file download
    console.log('Downloading material:', material.title);
    // Simulate download with alert
    alert(`Downloading: ${material.title}.${material.fileType.toLowerCase()}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-school-primary mb-4">Learning Materials</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Filter Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="search" className="text-sm font-medium block mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="search" 
                    placeholder="Search materials..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Course</p>
                <div className="space-y-2">
                  <Button 
                    variant={selectedCourse === 'all' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setSelectedCourse('all')}
                  >
                    All Courses
                  </Button>
                  
                  {courses.map(code => (
                    <Button 
                      key={code} 
                      variant={selectedCourse === code ? 'default' : 'outline'} 
                      className="w-full justify-start"
                      onClick={() => setSelectedCourse(code)}
                    >
                      {code}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
              <CardDescription>
                {filteredMaterials.length} materials found
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((material) => (
                    <div key={material.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex">
                        <div className="mr-4">
                          {getFileIcon(material.fileType)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{material.title}</h4>
                          <div className="text-gray-500 text-sm">{material.courseCode} - {material.courseName}</div>
                          {material.description && (
                            <p className="text-gray-600 text-sm mt-1">{material.description}</p>
                          )}
                          <div className="flex items-center text-gray-500 text-xs mt-1">
                            <span className="mr-3">Uploaded by: {material.uploadedBy}</span>
                            <span className="mr-3">{material.date}</span>
                            <span className="bg-gray-100 rounded px-2 py-0.5">
                              {material.fileType} • {material.fileSize}
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 ml-2"
                          onClick={() => handleDownload(material)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No materials found matching your criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningMaterials;
