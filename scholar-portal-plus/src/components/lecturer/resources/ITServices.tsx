
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LifeBuoy, Wifi, HardDrive, Database, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ITServices = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-school-secondary"
          onClick={() => navigate('/lecturer-portal')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-school-secondary mb-6">IT Services for Faculty</h1>
      
      <div className="mb-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LifeBuoy className="h-5 w-5 text-school-secondary" />
              IT Helpdesk
            </CardTitle>
            <CardDescription>Get help with any technology-related issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>The IT Helpdesk is available to assist faculty members with any technology-related problems or questions.</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border p-4 rounded-md">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <p><strong>Email:</strong> faculty.helpdesk@example.edu</p>
                <p><strong>Phone:</strong> +1 (555) 123-4580</p>
                <p><strong>Hours:</strong> Monday-Friday, 8:00 AM - 8:00 PM</p>
              </div>
              <div className="border p-4 rounded-md">
                <h3 className="font-semibold mb-2">Support Portal</h3>
                <p>Access the self-service portal to submit tickets, check status, and browse knowledge base articles.</p>
                <Button className="mt-2">Access Support Portal</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-school-secondary" />
                Network Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Information about campus network resources available to faculty.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Campus Wi-Fi Access</li>
                <li>VPN for Remote Access</li>
                <li>Network Drives and Storage</li>
                <li>Eduroam Configuration</li>
                <li>Network Security Guidelines</li>
              </ul>
              <Button className="w-full" variant="outline">
                Network Services Guide
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-school-secondary" />
                Classroom Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Resources for using technology in teaching spaces.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Smart Classroom Equipment</li>
                <li>Projectors and Display Systems</li>
                <li>Audio/Visual Equipment</li>
                <li>Lecture Capture Systems</li>
                <li>Classroom Equipment Training</li>
              </ul>
              <Button className="w-full" variant="outline">
                Classroom Tech Guide
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-school-secondary" />
                Software Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Software applications available to faculty members.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Microsoft Office 365</li>
                <li>Academic Software Licenses</li>
                <li>Research Software</li>
                <li>Anti-Virus and Security Tools</li>
                <li>Software Installation Requests</li>
              </ul>
              <Button className="w-full" variant="outline">
                Software Catalog
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-school-secondary" />
                Data Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Resources for data management, storage, and analysis.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Data Storage Solutions</li>
                <li>Research Data Management</li>
                <li>High-Performance Computing</li>
                <li>Data Backup Services</li>
                <li>Data Security Guidelines</li>
              </ul>
              <Button className="w-full" variant="outline">
                Data Services Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Technology Training</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The IT department offers various training sessions to help faculty members effectively use available technology resources.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline">Upcoming Training Sessions</Button>
            <Button variant="outline">Training Materials & Tutorials</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ITServices;
