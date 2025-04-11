
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StudentDashboard from '@/components/student/Dashboard';
import { isAuthenticated, hasRole, getCurrentUser, logout } from '@/utils/authUtils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const StudentPortal = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();

  useEffect(() => {
    // Check if user is authenticated and has student role
    const checkAuth = () => {
      if (!isAuthenticated()) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please login to access the student portal."
        });
        navigate('/login?role=student');
        return;
      }

      if (!hasRole('student')) {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "You do not have permission to access the student portal."
        });
        navigate('/');
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate('/login?role=student');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-school-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-school-primary">Loading portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-school-primary/10 to-school-accent/10 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-school-primary">Student Portal</h1>
            {user && <p className="text-gray-600">Welcome, {user.name}</p>}
          </div>
          <Button
            variant="outline"
            className="border-school-primary text-school-primary hover:bg-school-primary/10"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      <main className="flex-grow bg-gray-50">
        <StudentDashboard />
      </main>
    </div>
  );
};

export default StudentPortal;
