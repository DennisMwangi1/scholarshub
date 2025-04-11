
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Laptop, Wifi, HelpCircle, MailQuestion, Monitor, LockKeyhole, FileQuestion } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ITSupport = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I connect to campus Wi-Fi?",
      answer: "To connect to campus Wi-Fi, select the 'Student-Network' from your device's Wi-Fi list. Enter your student ID as the username and your portal password. For secure connections, use 'Student-Secure' network which requires a one-time setup with our security certificate."
    },
    {
      question: "I forgot my password. How do I reset it?",
      answer: "You can reset your password by visiting the password reset page at password.example.edu. You'll need to verify your identity using your registered email or phone number. Alternatively, you can visit the IT helpdesk with your student ID for in-person assistance."
    },
    {
      question: "How do I access my student email?",
      answer: "Access your student email by visiting mail.example.edu and logging in with your student credentials. You can also set up your email on mobile devices using the Outlook or Gmail apps. Your email address follows the format studentid@student.example.edu."
    },
    {
      question: "What software is available to students?",
      answer: "Students have access to various software packages including Microsoft Office 365, Adobe Creative Cloud, MATLAB, SPSS, and various programming tools. Visit software.example.edu to download these applications or check the computer labs for installed software."
    },
    {
      question: "How do I print documents on campus?",
      answer: "To print on campus, send your documents to printing.example.edu, select a printer location, and swipe your student ID at the printer. Each student receives a printing allowance each semester. Color printing is available at designated printers for an additional charge."
    },
    {
      question: "I'm having issues with my online course. Who should I contact?",
      answer: "For online course technical issues, contact the E-Learning Support team at elearning@example.edu or call the helpdesk at 555-123-4567. For course content issues, please contact your instructor directly."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-school-primary"
          onClick={() => navigate('/student-portal')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-school-primary mb-6">IT Support Resources</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-school-primary" />
              IT Helpdesk
            </CardTitle>
            <CardDescription>
              Get assistance with all your technology needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Our IT helpdesk is your first point of contact for technology-related issues. We provide support for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account access issues</li>
              <li>Email configuration</li>
              <li>Wi-Fi connectivity</li>
              <li>Software installation</li>
              <li>Computer hardware problems</li>
              <li>Printing services</li>
            </ul>
            <div className="pt-2">
              <p className="font-medium">Location:</p>
              <p>Technology Center, Room 105</p>
              
              <p className="font-medium mt-2">Hours:</p>
              <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
              
              <p className="font-medium mt-2">Contact:</p>
              <p>Email: helpdesk@example.edu</p>
              <p>Phone: 555-123-4567</p>
            </div>
            <Button className="w-full">Submit Support Ticket</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Laptop className="h-5 w-5 text-school-primary" />
              Computer Labs
            </CardTitle>
            <CardDescription>
              Access to high-performance computers and specialized software
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Our computer labs provide students with access to high-performance computers and specialized software that may not be available on personal devices.</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Main Computer Lab</h3>
                <p className="text-sm">Technology Center, Room 120</p>
                <p className="text-sm">Hours: 24/7 with student ID access</p>
                <p className="text-sm">Equipment: 50 workstations with dual monitors</p>
              </div>
              
              <div>
                <h3 className="font-medium">Engineering Lab</h3>
                <p className="text-sm">Engineering Building, Room 305</p>
                <p className="text-sm">Hours: 8:00 AM - 10:00 PM (Mon-Fri)</p>
                <p className="text-sm">Equipment: CAD workstations, 3D printers</p>
              </div>
              
              <div>
                <h3 className="font-medium">Media Production Lab</h3>
                <p className="text-sm">Arts Building, Room 210</p>
                <p className="text-sm">Hours: 9:00 AM - 9:00 PM (Mon-Fri)</p>
                <p className="text-sm">Equipment: Adobe workstations, audio/video editing</p>
              </div>
            </div>
            
            <Button className="w-full">View Lab Availability</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-school-primary" />
              Network Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Information about connecting to campus networks and accessing resources remotely.</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Wi-Fi Setup Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                VPN Access Instructions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Network Policies
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-school-primary" />
              Software Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Access to licensed software and cloud applications for academic use.</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Microsoft Office 365
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Adobe Creative Cloud
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Statistical Software
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Programming Tools
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="h-5 w-5 text-school-primary" />
              Security Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Tools and guides to help secure your devices and protect your data.</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Antivirus Software
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Password Guidelines
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Phishing Awareness
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-school-primary" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MailQuestion className="h-5 w-5 text-school-primary" />
            Contact IT Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Can't find what you're looking for? Reach out to our IT support team for personalized assistance.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <Button className="w-full">
              Live Chat Support
            </Button>
            <Button variant="outline" className="w-full">
              Submit Support Ticket
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ITSupport;
