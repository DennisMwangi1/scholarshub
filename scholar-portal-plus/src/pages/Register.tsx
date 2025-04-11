
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RegisterComponent from '@/components/auth/Register';
import { isAuthenticated, hasRole } from '@/utils/authUtils';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'student';
  const { toast } = useToast();

  useEffect(() => {
    // If already authenticated, redirect to appropriate portal
    if (isAuthenticated()) {
      const isLecturer = hasRole('lecturer');
      
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
      <RegisterComponent />
    </div>
  );
};

export default Register;
