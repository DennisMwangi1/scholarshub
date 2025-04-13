
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LockKeyhole, Mail, User, BookUser, BookKey } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/api';
import TwoFactorAuth from './TwoFactorAuth';

interface Response {
  message: string;
  mfa_required: boolean;
  qr: string;
}

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterComponent = ({ role }: { role: 'student' | 'lecturer'; }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const response: Response = await api.register(
        values.name,
        values.email,
        values.password,
        role
      );
      setQrCodeUrl(response.qr);
      setShowTwoFactor(response.mfa_required);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An error occurred during registration."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSuccess = () => {
    navigate(`/login?role=${role}`);
    toast({
      title: "MFA setup successful",
      description: `Login to the ${role}'s portal.`
    });
  };

  if (showTwoFactor) {
    return <TwoFactorAuth onSuccess={handleTwoFactorSuccess} qrCodeUrl={qrCodeUrl} mode='register' role={role} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              {role === 'lecturer' ? (
                <div className="h-12 w-12 rounded-full bg-school-secondary/20 flex items-center justify-center">
                  <BookKey className="h-6 w-6 text-school-secondary" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-school-primary/20 flex items-center justify-center">
                  <BookUser className="h-6 w-6 text-school-primary" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {role === 'lecturer' ? 'Lecturer Registration' : 'Student Registration'}
            </CardTitle>
            <CardDescription>
              Create a new account to access the {role} portal
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue={role} value={role}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="student" onClick={() => navigate('/register?role=student')}>
                Student
              </TabsTrigger>
              <TabsTrigger value="lecturer" onClick={() => navigate('/register?role=lecturer')}>
                Lecturer
              </TabsTrigger>
            </TabsList>

            <TabsContent value={role}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="pl-10"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <FormControl>
                              <Input
                                placeholder="name@scholarportal.edu"
                                type="email"
                                className="pl-10"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <FormControl>
                              <Input
                                type="password"
                                className="pl-10"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Password must be at least 8 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <FormControl>
                              <Input
                                type="password"
                                className="pl-10"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  <CardFooter>
                    <Button
                      type="submit"
                      className={`w-full ${role === 'lecturer' ? 'bg-school-secondary hover:bg-school-secondary/90' : 'bg-school-primary hover:bg-school-primary/90'}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </CardFooter>
                </form>
              </Form>

              <div className="p-4 text-center text-sm">
                Already have an account?{" "}
                <a
                  href={`/login?role=${role}`}
                  className={`font-medium ${role === 'lecturer' ? 'text-school-secondary' : 'text-school-primary'} hover:underline`}
                >
                  Sign in
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default RegisterComponent;
