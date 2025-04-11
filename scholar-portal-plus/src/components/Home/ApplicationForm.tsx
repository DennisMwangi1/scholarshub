
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';

interface ApplicationForm {
  id: number;
  title: string;
  description: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

const applicationForms: ApplicationForm[] = [
  {
    id: 1,
    title: 'Undergraduate Admission Form',
    description: 'Application form for new undergraduate students.',
    fileSize: '245 KB',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 2,
    title: 'Graduate Admission Form',
    description: 'Application form for Masters and PhD programs.',
    fileSize: '320 KB',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 3,
    title: 'Scholarship Application',
    description: 'Form for applying to various scholarship programs.',
    fileSize: '280 KB',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 4,
    title: 'Hostel Accommodation Request',
    description: 'Form for requesting on-campus accommodation.',
    fileSize: '210 KB',
    fileType: 'PDF',
    downloadUrl: '#'
  }
];

const ApplicationForm = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-school-primary mb-2">Application Forms</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Download and complete these forms to apply for admission, scholarships, and other services offered by our institution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {applicationForms.map((form) => (
            <Card key={form.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-school-primary/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-school-primary" />
                </div>
                <CardTitle className="text-lg text-school-primary">{form.title}</CardTitle>
                <CardDescription className="text-sm">{form.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div>{form.fileType}</div>
                  <div>{form.fileSize}</div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-school-primary hover:bg-school-primary/90"
                >
                  <a href={form.downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Form
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
