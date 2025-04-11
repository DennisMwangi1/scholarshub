
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResearchGuidelines = () => {
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
      
      <h1 className="text-3xl font-bold text-school-secondary mb-6">Research Guidelines</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-school-secondary" />
              Research Funding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This section provides information on available funding opportunities for your research projects.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Internal Research Grants</li>
              <li>External Funding Sources</li>
              <li>Grant Application Process</li>
              <li>Budget Management</li>
              <li>Research Assistant Funding</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Funding Guide
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-school-secondary" />
              Research Ethics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Guidelines for conducting research in an ethical manner and obtaining necessary approvals.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ethics Committee Review Process</li>
              <li>Human Subjects Research</li>
              <li>Data Privacy and Protection</li>
              <li>Conflict of Interest</li>
              <li>Research Integrity</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Ethics Guidelines
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-school-secondary" />
              Publication Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Resources available to help you publish your research findings effectively.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Journal Selection</li>
              <li>Open Access Publishing</li>
              <li>Publication Fee Support</li>
              <li>Editing and Proofreading Services</li>
              <li>Citation and Impact Metrics</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Publication Guide
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-school-secondary" />
              Research Collaboration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Information on establishing and maintaining productive research collaborations.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Interdisciplinary Collaboration</li>
              <li>Industry Partnerships</li>
              <li>International Collaboration</li>
              <li>Collaborative Agreements</li>
              <li>Intellectual Property in Collaborations</li>
            </ul>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Collaboration Guide
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Complete Research Handbook</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This comprehensive guide contains all the information you need to conduct and publish research at our institution.</p>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Complete Research Guidelines (PDF)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchGuidelines;
