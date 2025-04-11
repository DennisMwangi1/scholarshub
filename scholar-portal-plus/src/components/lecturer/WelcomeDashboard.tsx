
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, FileText, UserPlus, GraduationCap, CheckCircle, Plus, Settings, Users, Wifi } from 'lucide-react';
import { getCurrentUser } from '@/utils/authUtils';
import { useNavigate } from 'react-router-dom';

const WelcomeDashboard = () => {
  const user = getCurrentUser();
  const registrationDate = user?.registrationDate || 'Recently';
  const navigate = useNavigate();

  const onboardingSteps = [
    {
      title: "Complete Your Profile",
      description: "Add your professional details, contact information, and academic background.",
      icon: UserPlus,
      status: "todo"
    },
    {
      title: "Set Up Your Courses",
      description: "Create your course structure and upload course materials.",
      icon: BookOpen,
      status: "todo"
    },
    {
      title: "Review Academic Calendar",
      description: "Familiarize yourself with important dates, examination periods, and holidays.",
      icon: Calendar,
      status: "todo"
    },
    {
      title: "Faculty Orientation",
      description: "Attend the faculty orientation session to meet colleagues and learn about resources.",
      icon: FileText,
      status: "todo"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-school-secondary/20 to-school-accent/20 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-school-secondary mb-2">Welcome to the Faculty Portal!</h1>
        <p className="text-gray-700">
          We're delighted to have you join our academic team! You registered on {registrationDate}. 
          Let's get you set up with everything you need to begin your teaching journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-school-secondary" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`flex-shrink-0 p-1.5 rounded-full ${step.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <step.icon className={`h-5 w-5 ${step.status === 'completed' ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-school-secondary" />
              Faculty Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate('/lecturer-resources/handbook')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Faculty Handbook
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate('/lecturer-resources/research-guidelines')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Research Guidelines
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate('/lecturer-resources/teaching-resources')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Teaching Resources
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate('/lecturer-resources/department-contacts')}
              >
                <Users className="mr-2 h-4 w-4" />
                Department Contacts
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate('/lecturer-resources/it-services')}
              >
                <Settings className="mr-2 h-4 w-4" />
                IT Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex justify-between items-center">
            <span>Create Your First Course</span>
            <Button size="sm" className="bg-school-secondary hover:bg-school-secondary/90">
              <Plus className="h-4 w-4 mr-1" /> New Course
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Get started by creating your first course. You'll be able to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Define the course structure and syllabus</li>
            <li>Upload course materials and readings</li>
            <li>Create assignments and assessments</li>
            <li>Manage student enrollments</li>
            <li>Post announcements and updates</li>
          </ul>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Need help setting up your course? Check out our <a href="#" className="text-school-secondary hover:underline">course creation guide</a> or contact academic support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeDashboard;
