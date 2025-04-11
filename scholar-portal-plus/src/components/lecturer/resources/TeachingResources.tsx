
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeachingResources = () => {
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
      
      <h1 className="text-3xl font-bold text-school-secondary mb-6">Teaching Resources</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-secondary" />
              Course Design
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Resources to help you design effective and engaging courses for your students.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Curriculum Development</li>
              <li>Learning Outcomes</li>
              <li>Course Structure Templates</li>
              <li>Syllabus Design</li>
              <li>Integrating Technology</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Course Design Guide
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-secondary" />
              Teaching Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Explore various teaching methodologies to enhance your classroom effectiveness.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Active Learning Strategies</li>
              <li>Flipped Classroom Approach</li>
              <li>Problem-Based Learning</li>
              <li>Case Study Method</li>
              <li>Collaborative Learning</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Teaching Methods Guide
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-secondary" />
              Assessment Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Tools and techniques for effective student assessment and evaluation.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Formative vs Summative Assessment</li>
              <li>Creating Effective Exams</li>
              <li>Alternative Assessment Methods</li>
              <li>Rubric Development</li>
              <li>Providing Constructive Feedback</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Assessment Guide
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-school-secondary" />
              Educational Technology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Learn about technology tools available to enhance your teaching and student engagement.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Learning Management System</li>
              <li>Video Conferencing Tools</li>
              <li>Interactive Presentation Software</li>
              <li>Student Response Systems</li>
              <li>Virtual Labs and Simulations</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Ed Tech Guide
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Teaching Excellence Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The Teaching Excellence Center offers workshops, one-on-one consultations, and peer observation opportunities to help you enhance your teaching skills.</p>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Teaching Excellence Resources (PDF)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachingResources;
