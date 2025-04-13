
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginComponent from '@/components/auth/Login';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/api';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'student';
  const { toast } = useToast();
  const token = localStorage.getItem('token');
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
    // If already authenticated, redirect to appropriate portal
    if (token && user) {
      const isLecturer = user.role === 'lecturer';
      if (role === 'lecturer' && isLecturer) {
        toast({
          title: "Already logged in",
          description: "Redirecting to lecturer portal"
        });
        navigate('/lecturer-portal');
      } else if (role === 'student' && !isLecturer) {
        toast({
          title: "Already logged in",
          description: "Redirecting to student portal"
        });
        navigate('/student-portal');
      }
    }
  }, [navigate, role, toast]);

  return (
    <div>
      <LoginComponent role={role as 'student' | 'lecturer'} />
    </div>
  );
};

export default Login;
