
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from '@/components/student/Dashboard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/api';

const StudentPortal = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user === null) return;
    const checkAuth = () => {

      if (user.role !== 'student') {
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
  }, [navigate, toast, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate('/login?role=student');
  };

  if (loading || !user) {
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
