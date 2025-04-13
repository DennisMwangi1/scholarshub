import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, FileText, GraduationCap, ListChecks, Loader, User } from 'lucide-react';
import WelcomeDashboard from './WelcomeDashboard';
import { api } from '@/api';

const LecturerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [isNewLecturer, setIsNewLecturer] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getCurrentUser();
        setUser(response.user);
        setIsNewLecturer(true);
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
        {/* Left sidebar - Lecturer profile summary */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-3">
                <div className="h-20 w-20 rounded-full bg-school-secondary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-school-secondary" />
                </div>
              </div>
              <CardTitle>{user?.name || 'Dr. Jane Smith'}</CardTitle>
              <CardDescription>Employee ID: {user?.employeeId || 'LC789012'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{user?.department || 'Computer Science'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Academic Year</p>
                  <p className="font-medium">2023-2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email || 'lecturer@example.edu'}</p>
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
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-secondary hover:bg-school-secondary/10" onClick={() => setActiveTab('overview')}>
              <GraduationCap className="mr-2 h-5 w-5" />
              Courses Overview
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-secondary hover:bg-school-secondary/10" onClick={() => setActiveTab('management')}>
              <ListChecks className="mr-2 h-5 w-5" />
              Course Management
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-secondary hover:bg-school-secondary/10" onClick={() => setActiveTab('materials')}>
              <BookOpen className="mr-2 h-5 w-5" />
              Learning Materials
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-secondary hover:bg-school-secondary/10" onClick={() => setActiveTab('timetable')}>
              <Calendar className="mr-2 h-5 w-5" />
              Timetable
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-school-secondary hover:bg-school-secondary/10" onClick={() => setActiveTab('results')}>
              <FileText className="mr-2 h-5 w-5" />
              Results & Grading
            </Button>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-full md:w-3/4">
          {isNewLecturer ? (
            <WelcomeDashboard />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue={activeTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="timetable">Timetable</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="pt-4">
                <div>
                  <h2 className="text-2xl font-bold text-school-secondary mb-4">Courses Overview</h2>
                  <p>Here you can see an overview of your courses.</p>
                </div>
              </TabsContent>

              {/* Management Tab */}
              <TabsContent value="management" className="pt-4">
                <div>
                  <h2 className="text-2xl font-bold text-school-secondary mb-4">Course Management</h2>
                  <p>Manage your courses here.</p>
                </div>
              </TabsContent>

              {/* Materials Tab */}
              <TabsContent value="materials" className="pt-4">
                <div>
                  <h2 className="text-2xl font-bold text-school-secondary mb-4">Learning Materials</h2>
                  <p>Upload and manage learning materials for your courses.</p>
                </div>
              </TabsContent>

              {/* Timetable Tab */}
              <TabsContent value="timetable" className="pt-4">
                <div>
                  <h2 className="text-2xl font-bold text-school-secondary mb-4">Timetable</h2>
                  <p>View your timetable here.</p>
                </div>
              </TabsContent>

              {/* Results Tab */}
              <TabsContent value="results" className="pt-4">
                <div>
                  <h2 className="text-2xl font-bold text-school-secondary mb-4">Results & Grading</h2>
                  <p>Manage and submit grades for your students.</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
