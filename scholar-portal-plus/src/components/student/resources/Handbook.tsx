
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
          className="flex items-center gap-2 text-school-primary"
          onClick={() => navigate('/student-portal')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-school-primary mb-6">Student Handbook</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-primary" />
              Introduction to the University
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Welcome to Scholar Portal University. This handbook is designed to help you navigate your academic journey with us.</p>
            <p>Founded in 1985, our institution has a rich history of academic excellence and innovation. Our mission is to provide quality education that prepares students for the challenges of the modern world.</p>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Introduction
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-primary" />
              Academic Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This section outlines the academic policies that govern your studies at the university.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Attendance Requirements</li>
              <li>Grading System</li>
              <li>Academic Integrity</li>
              <li>Examination Procedures</li>
              <li>Course Registration and Withdrawal</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Academic Policies
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-primary" />
              Student Rights & Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>As a student, you have certain rights and responsibilities that you should be aware of.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Right to Quality Education</li>
              <li>Right to Fair Assessment</li>
              <li>Responsibility to Participate</li>
              <li>Responsibility to Respect Others</li>
              <li>Code of Conduct</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Rights & Responsibilities
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-primary" />
              Campus Facilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Learn about the various facilities available on campus to enhance your learning experience.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Libraries and Study Spaces</li>
              <li>Computer Labs</li>
              <li>Sports Facilities</li>
              <li>Student Union</li>
              <li>Health Services</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Campus Facilities Guide
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Complete Handbook</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This is the complete student handbook which includes all the information you need for your academic journey.</p>
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
