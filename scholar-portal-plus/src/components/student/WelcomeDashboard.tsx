
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, FileText, UserPlus, GraduationCap, CheckCircle, Library, BadgeDollarSign, HelpCircle } from 'lucide-react';
import { getCurrentUser } from '@/utils/authUtils';
import { Link } from 'react-router-dom';

const WelcomeDashboard = () => {
  const user = getCurrentUser();
  const registrationDate = user?.registrationDate || 'Recently';

  const onboardingSteps = [
    {
      title: "Complete Your Profile",
      description: "Add your personal details, contact information, and academic background.",
      icon: UserPlus,
      status: "todo"
    },
    {
      title: "Register for Courses",
      description: "Browse available courses and register for your semester.",
      icon: BookOpen,
      status: "todo"
    },
    {
      title: "Explore the Academic Calendar",
      description: "Familiarize yourself with important dates and deadlines.",
      icon: Calendar,
      status: "todo"
    },
    {
      title: "Set Up Your Student ID",
      description: "Visit the registrar's office to get your student ID card.",
      icon: FileText,
      status: "todo"
    }
  ];

  const studentResources = [
    {
      title: "Student Handbook",
      path: "/student-resources/handbook",
      icon: BookOpen
    },
    {
      title: "Library Access",
      path: "/student-resources/library",
      icon: Library
    },
    {
      title: "Financial Aid Information",
      path: "/student-resources/financial-aid",
      icon: BadgeDollarSign
    },
    {
      title: "IT Support Resources",
      path: "/student-resources/it-support",
      icon: HelpCircle
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-school-primary/20 to-school-accent/20 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-school-primary mb-2">Welcome to Scholar Portal!</h1>
        <p className="text-gray-700">
          Congratulations on joining us! You registered on {registrationDate}. 
          Let's get you started with everything you need for a successful academic journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-school-primary" />
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
              <GraduationCap className="mr-2 h-5 w-5 text-school-primary" />
              New Student Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              {studentResources.map((resource, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="justify-start"
                  asChild
                >
                  <Link to={resource.path}>
                    <resource.icon className="mr-2 h-5 w-5" />
                    {resource.title}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Important Upcoming Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Course Registration Deadline</p>
                <p className="text-sm text-gray-500">Last day to register for courses this semester</p>
              </div>
              <div className="bg-school-accent/20 px-3 py-1 rounded text-school-primary font-medium">
                Next Week
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Orientation Session</p>
                <p className="text-sm text-gray-500">Introduction to campus facilities and resources</p>
              </div>
              <div className="bg-school-accent/20 px-3 py-1 rounded text-school-primary font-medium">
                3 Days
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">First Day of Classes</p>
                <p className="text-sm text-gray-500">Start of the academic semester</p>
              </div>
              <div className="bg-school-accent/20 px-3 py-1 rounded text-school-primary font-medium">
                2 Weeks
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeDashboard;
