
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Handbook = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-school-secondary"
          onClick={() => navigate('/lecturer-portal')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-school-secondary mb-6">Faculty Handbook</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-secondary" />
              Introduction to the Faculty
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Welcome to the Faculty of Scholar Portal University. This handbook is designed to help you navigate your teaching responsibilities and academic career with us.</p>
            <p>As a lecturer, you play a vital role in our institution's mission to provide quality education and foster a culture of excellence and innovation.</p>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Introduction
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-secondary" />
              Faculty Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This section outlines the policies that govern your role as a faculty member at the university.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Academic Freedom and Responsibilities</li>
              <li>Teaching Load and Office Hours</li>
              <li>Performance Evaluation</li>
              <li>Promotion and Tenure</li>
              <li>Leave and Sabbatical Policies</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Faculty Policies
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-secondary" />
              Teaching Standards & Expectations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>As a faculty member, you are expected to uphold certain teaching standards and expectations.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Course Design and Development</li>
              <li>Assessment Methods and Grading</li>
              <li>Student Engagement and Support</li>
              <li>Use of Technology in Teaching</li>
              <li>Handling Academic Misconduct</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Teaching Standards
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-secondary" />
              Research and Publication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Learn about the university's research expectations and support for faculty scholarship.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Research Funding Opportunities</li>
              <li>Publication Support</li>
              <li>Conference Attendance</li>
              <li>Research Ethics</li>
              <li>Intellectual Property Rights</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Research Guidelines
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Complete Faculty Handbook</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This is the complete faculty handbook which includes all the information you need for your academic career at our institution.</p>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Complete Handbook (PDF)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Handbook;
