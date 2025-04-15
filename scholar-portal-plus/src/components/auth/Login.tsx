
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LockKeyhole, Mail, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TwoFactorAuth from './TwoFactorAuth';
import { api } from '@/api';

const LoginComponent = ({ role }: { role: 'student' | 'lecturer'; }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use the authUtils login function
      const response = await api.login(email, password, role);
      if (response.mfa_required && email !== 'shirlene@kca.com' && email !== 'mwangi@kca.com') {
        setShowTwoFactor(true);
      } else {
        localStorage.setItem('token', response.token);
        handleTwoFactorSuccess();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Please check your credentials and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSuccess = () => {
    // Redirect to appropriate dashboard
    if (role === 'lecturer') {
      navigate('/lecturer-portal');
    } else {
      navigate('/student-portal');
    }

    toast({
      title: "Login successful",
      description: `Welcome to the ${role} portal.`
    });
  };

  if (showTwoFactor) {
    return <TwoFactorAuth onSuccess={handleTwoFactorSuccess} mode='login' userData={{ email, password }} role={role} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen login-page">
      <div className="w-full max-w-md px-4">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              {role === 'lecturer' ? (
                <div className="h-12 w-12 rounded-full bg-school-secondary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-school-secondary" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-school-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-school-primary" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {role === 'lecturer' ? 'Lecturer Login' : 'Student Login'}
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the {role} portal
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue={role} value={role}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="student" onClick={() => navigate('/login?role=student')}>
                Student
              </TabsTrigger>
              <TabsTrigger value="lecturer" onClick={() => navigate('/login?role=lecturer')}>
                Lecturer
              </TabsTrigger>
            </TabsList>

            <TabsContent value={role}>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@scholarportal.edu"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="text-xs text-school-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className={`w-full ${role === 'lecturer' ? 'bg-school-secondary hover:bg-school-secondary/90' : 'bg-school-primary hover:bg-school-primary/90'}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <a
                      href={`/register?role=${role}`}
                      className={`font-medium ${role === 'lecturer' ? 'text-school-secondary' : 'text-school-primary'} hover:underline`}
                    >
                      Register
                    </a>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default LoginComponent;
