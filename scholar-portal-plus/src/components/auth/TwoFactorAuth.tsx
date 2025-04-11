
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { KeyRound } from 'lucide-react';
import { verifyOtp } from '@/utils/authUtils';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface TwoFactorAuthProps {
  onSuccess: () => void;
  qrCodeUrl?: string;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onSuccess, qrCodeUrl }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Convert the QR code URL to an actual image URL
  const qrImageUrl = qrCodeUrl ? 
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl)}` :
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/ScholarPortal:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=ScholarPortal';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Use authUtils to verify OTP
      const success = await verifyOtp(otp);
      if (success) {
        onSuccess();
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "Please enter a valid 6-digit code."
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
              Scan the QR code with your authenticator app and enter the verification code
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <img src={qrImageUrl} alt="QR Code" className="w-48 h-48" />
            </div>
            
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
                {isLoading ? 'Verifying...' : 'Verify Code'}
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
