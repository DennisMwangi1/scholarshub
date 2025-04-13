
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, Clock, Download, FileText, GraduationCap, ListChecks, Loader, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import CoursesOverview from './CoursesOverview';
import CoursesRegistration from './CoursesRegistration';
import LearningMaterials from './LearningMaterials';
import Timetable from './Timetable';
import ResultsTranscripts from './ResultsTranscripts';
import WelcomeDashboard from './WelcomeDashboard';
import { api } from '@/api';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [isNewStudent, setIsNewStudent] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getCurrentUser();
        setUser(response.user);
        setIsNewStudent(true);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);
  if (!user) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar - Student profile summary */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-3">
                <div className="h-20 w-20 rounded-full bg-school-primary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-school-primary" />
                </div>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Student ID: {user?.studentId || 'ST123456'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-sm text-gray-500">Program</p>
                  <p className="font-medium">Bachelor of Computer Science</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Academic Year</p>
                  <p className="font-medium">2023-2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <p className="font-medium">Active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-primary hover:bg-school-primary/10" onClick={() => setActiveTab('overview')}>
              <GraduationCap className="mr-2 h-5 w-5" />
              Academic Overview
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-primary hover:bg-school-primary/10" onClick={() => setActiveTab('registration')}>
              <ListChecks className="mr-2 h-5 w-5" />
              Course Registration
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-primary hover:bg-school-primary/10" onClick={() => setActiveTab('materials')}>
              <BookOpen className="mr-2 h-5 w-5" />
              Learning Materials
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-primary hover:bg-school-primary/10" onClick={() => setActiveTab('timetable')}>
              <Calendar className="mr-2 h-5 w-5" />
              Timetable
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-primary hover:bg-school-primary/10" onClick={() => setActiveTab('results')}>
              <FileText className="mr-2 h-5 w-5" />
              Results & Transcripts
            </Button>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-full md:w-3/4">
          {isNewStudent ? (
            <WelcomeDashboard />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue={activeTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="registration">Registration</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="timetable">Timetable</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="pt-4">
                <CoursesOverview />
              </TabsContent>

              {/* Registration Tab */}
              <TabsContent value="registration" className="pt-4">
                <CoursesRegistration />
              </TabsContent>

              {/* Materials Tab */}
              <TabsContent value="materials" className="pt-4">
                <LearningMaterials />
              </TabsContent>

              {/* Timetable Tab */}
              <TabsContent value="timetable" className="pt-4">
                <Timetable />
              </TabsContent>

              {/* Results Tab */}
              <TabsContent value="results" className="pt-4">
                <ResultsTranscripts />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
