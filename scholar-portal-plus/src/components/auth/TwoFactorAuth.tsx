import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { KeyRound } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { api } from '@/api';

interface TwoFactorAuthProps {
  onSuccess: () => void;
  qrCodeUrl?: string;
  mode: 'register' | 'login';
  userData?: {
    email: string,
    password: string;
  };
  role: 'student' | 'lecturer';
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onSuccess, qrCodeUrl, mode, userData, role }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only verify OTP in login mode
      if (mode === 'login') {
        const response = await api.login(userData.email, userData.password, role, otp);
        if (response.token) {
          localStorage.setItem('token', response.token);
          onSuccess();
        } else {
          throw new Error("Invalid verification code");
        }
      } else {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "Please enter a valid 6-digit code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen login-page">
      <div className="w-full max-w-md px-4">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-school-accent/20 flex items-center justify-center">
                <KeyRound className="h-6 w-6 text-school-accent" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
            <CardDescription>
              {mode === 'register'
                ? 'Scan the QR code with your authenticator app to set up 2FA, then enter the code.'
                : 'Enter the 6-digit code from your authenticator app to continue.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {mode === 'register' && qrCodeUrl && (
              <div className="flex justify-center mb-4">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-sm text-gray-500">
                <p>Don't have an authenticator app?</p>
                <p>Download <a href="https://google.com" className="text-school-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Authenticator</a> or <a href="https://authy.com" className="text-school-primary hover:underline" target="_blank" rel="noopener noreferrer">Authy</a>.</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-school-accent text-school-primary hover:bg-school-accent/90"
                disabled={isLoading}
              >
                {isLoading ? (mode === 'login' ? 'Verifying...' : 'Setting up...') : (mode === 'login' ? 'Verify Code' : 'Complete Setup')}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button variant="link" className="text-school-primary hover:text-school-primary/80">
              Need help?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
