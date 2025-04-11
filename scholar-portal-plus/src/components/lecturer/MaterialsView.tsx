
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download, FileText, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample materials data - in a real app this would come from an API
const initialMaterials = [
  {
    id: 'M001',
    title: 'Introduction to Algorithms - Lecture Notes',
    courseCode: 'CS101',
    uploadDate: 'June 10, 2023',
    fileSize: '2.3 MB',
    fileType: 'PDF',
    downloads: 42
  },
  {
    id: 'M002',
    title: 'Week 3 Lab Exercises',
    courseCode: 'CS101',
    uploadDate: 'June 12, 2023',
    fileSize: '1.5 MB',
    fileType: 'PDF',
    downloads: 37
  },
  {
    id: 'M003',
    title: 'Assignment 2 Instructions',
    courseCode: 'CS205',
    uploadDate: 'June 15, 2023',
    fileSize: '850 KB',
    fileType: 'DOCX',
    downloads: 30
  },
  {
    id: 'M004',
    title: 'Database Systems Fundamentals',
    courseCode: 'CS310',
    uploadDate: 'June 8, 2023',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    downloads: 28
  },
  {
    id: 'M005',
    title: 'Midterm Exam Study Guide',
    courseCode: 'CS405',
    uploadDate: 'June 14, 2023',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    downloads: 22
  }
];

interface MaterialsViewProps {
  selectedCourse: string | null;
  onClearFilter: () => void;
}

const MaterialsView: React.FC<MaterialsViewProps> = ({ selectedCourse, onClearFilter }) => {
  const [materials, setMaterials] = useState(initialMaterials);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    courseCode: selectedCourse || '',
    file: null as File | null
  });
  const { toast } = useToast();

  const filteredMaterials = selectedCourse
    ? materials.filter(material => material.courseCode === selectedCourse)
    : materials;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewMaterial({
        ...newMaterial,
        file: e.target.files[0]
      });
    }
  };

  const handleUpload = () => {
    if (!newMaterial.title || !newMaterial.courseCode || !newMaterial.file) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields"
      });
      return;
    }

    const now = new Date();
    const formattedDate = `${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()}`;
    
    // In a real app, this would be an API call to upload the file
    const newMaterialItem = {
      id: `M${Math.floor(Math.random() * 1000)}`,
      title: newMaterial.title,
      courseCode: newMaterial.courseCode,
      uploadDate: formattedDate,
      fileSize: `${(newMaterial.file.size / 1024).toFixed(1)} KB`,
      fileType: newMaterial.file.name.split('.').pop()?.toUpperCase() || 'FILE',
      downloads: 0
    };

    setMaterials([...materials, newMaterialItem]);
    setIsUploadDialogOpen(false);
    setNewMaterial({
      title: '',
      description: '',
      courseCode: selectedCourse || '',
      file: null
    });

    toast({
      title: "File uploaded",
      description: "Your teaching material has been uploaded successfully"
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-school-secondary">Course Materials</h2>
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
            onClick={() => setIsUploadDialogOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Materials
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <div key={material.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h4 className="font-medium text-school-secondary">{material.title}</h4>
                      <div className="flex flex-wrap gap-x-4 text-gray-500 text-sm mt-1">
                        <span>{material.courseCode}</span>
                        <span>Uploaded: {material.uploadDate}</span>
                        <span>{material.downloads} downloads</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="text-xs bg-gray-100 rounded px-2 py-1 mr-2">
                        {material.fileType} • {material.fileSize}
                      </span>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p className="mb-2">No materials found for this course</p>
                <p className="text-sm">Upload materials to help your students learn better</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Teaching Material</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="E.g., Lecture Notes Week 5" 
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                placeholder="Brief description of the material" 
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <select 
                id="course"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newMaterial.courseCode}
                onChange={(e) => setNewMaterial({...newMaterial, courseCode: e.target.value})}
              >
                <option value="" disabled>Select a course</option>
                <option value="CS101">CS101 - Introduction to Computer Science</option>
                <option value="CS205">CS205 - Data Structures and Algorithms</option>
                <option value="CS310">CS310 - Database Systems</option>
                <option value="CS405">CS405 - Artificial Intelligence</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <Input 
                id="file" 
                type="file"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, PPT, ZIP (Max 20MB)</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
            <Button className="bg-school-secondary hover:bg-school-secondary/90" onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MaterialsView;
