
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, DollarSign, GraduationCap, CalendarClock, FileText, BadgeDollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinancialAid = () => {
  const navigate = useNavigate();

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
      
      <h1 className="text-3xl font-bold text-school-primary mb-6">Financial Aid Information</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-school-primary" />
            Financial Aid Overview
          </CardTitle>
          <CardDescription>
            We're committed to making education accessible through various financial aid programs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our university offers a range of financial aid options to help students fund their education, including scholarships, grants, loans, and work-study opportunities. Eligibility for these programs varies based on academic merit, financial need, and other criteria.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
              <GraduationCap className="h-8 w-8 text-school-primary mb-2" />
              <h3 className="font-medium text-center">Scholarships</h3>
              <p className="text-sm text-center text-gray-500">Merit-based awards that don't require repayment</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-school-primary mb-2" />
              <h3 className="font-medium text-center">Grants</h3>
              <p className="text-sm text-center text-gray-500">Need-based aid that doesn't require repayment</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
              <FileText className="h-8 w-8 text-school-primary mb-2" />
              <h3 className="font-medium text-center">Loans</h3>
              <p className="text-sm text-center text-gray-500">Borrowed money that must be repaid with interest</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
              <BadgeDollarSign className="h-8 w-8 text-school-primary mb-2" />
              <h3 className="font-medium text-center">Work-Study</h3>
              <p className="text-sm text-center text-gray-500">Part-time employment to help pay for education</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="scholarships" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="work-study">Work-Study</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scholarships">
          <Card>
            <CardHeader>
              <CardTitle>Scholarships</CardTitle>
              <CardDescription>Merit-based awards that recognize academic excellence, talent, or other achievements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Academic Excellence Scholarship</h3>
                <p className="text-sm text-gray-600">Awarded to students with outstanding academic records. Covers up to 75% of tuition.</p>
                <p className="text-sm font-medium mt-1">Eligibility: GPA of 3.75 or higher, strong test scores</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Leadership Scholarship</h3>
                <p className="text-sm text-gray-600">Recognizes students who have demonstrated exceptional leadership abilities. Covers up to 50% of tuition.</p>
                <p className="text-sm font-medium mt-1">Eligibility: Record of leadership positions, community service</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Diversity Scholarship</h3>
                <p className="text-sm text-gray-600">Promotes diversity in our student body. Covers up to 60% of tuition.</p>
                <p className="text-sm font-medium mt-1">Eligibility: Contribution to diversity, academic merit</p>
              </div>
              
              <Button className="w-full">Apply for Scholarships</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="grants">
          <Card>
            <CardHeader>
              <CardTitle>Grants</CardTitle>
              <CardDescription>Need-based financial aid that doesn't need to be repaid.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">University Grant</h3>
                <p className="text-sm text-gray-600">Institutional grant based on financial need. Awards vary based on demonstrated need.</p>
                <p className="text-sm font-medium mt-1">Eligibility: Financial need as determined by FAFSA</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Federal Pell Grant</h3>
                <p className="text-sm text-gray-600">Government grant for undergraduate students with exceptional financial need.</p>
                <p className="text-sm font-medium mt-1">Eligibility: Determined by FAFSA, primarily for low-income students</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">State Grants</h3>
                <p className="text-sm text-gray-600">Various grants offered by state governments for residents.</p>
                <p className="text-sm font-medium mt-1">Eligibility: State residency, financial need, academic progress</p>
              </div>
              
              <Button className="w-full">Apply for Grants</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Loans</CardTitle>
              <CardDescription>Borrowed money that must be repaid with interest.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Federal Direct Subsidized Loans</h3>
                <p className="text-sm text-gray-600">Need-based loans where the government pays interest while you're in school.</p>
                <p className="text-sm font-medium mt-1">Interest Rate: 3.73% for undergraduate students</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Federal Direct Unsubsidized Loans</h3>
                <p className="text-sm text-gray-600">Available regardless of financial need. Interest accrues while in school.</p>
                <p className="text-sm font-medium mt-1">Interest Rate: 3.73% for undergraduate, 5.28% for graduate students</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Parent PLUS Loans</h3>
                <p className="text-sm text-gray-600">Federal loans available to parents of dependent undergraduate students.</p>
                <p className="text-sm font-medium mt-1">Interest Rate: 6.28%</p>
              </div>
              
              <Button className="w-full">Apply for Loans</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="work-study">
          <Card>
            <CardHeader>
              <CardTitle>Work-Study</CardTitle>
              <CardDescription>Part-time employment opportunities to help pay for education costs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Federal Work-Study Program</h3>
                <p className="text-sm text-gray-600">Provides part-time jobs for undergraduate and graduate students with financial need.</p>
                <p className="text-sm font-medium mt-1">Eligibility: Financial need as determined by FAFSA</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Campus Jobs</h3>
                <p className="text-sm text-gray-600">Positions available in various departments across campus.</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  <li>Library assistant</li>
                  <li>Research assistant</li>
                  <li>Administrative support</li>
                  <li>IT support</li>
                  <li>Campus tour guide</li>
                </ul>
              </div>
              
              <Button className="w-full">Browse Work-Study Opportunities</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-school-primary" />
            Important Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">FAFSA Application</p>
                <p className="text-sm text-gray-600">For the next academic year</p>
              </div>
              <div className="bg-school-accent/20 px-3 py-1 rounded text-school-primary font-medium">
                January 15, 2026
              </div>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Merit Scholarship Applications</p>
                <p className="text-sm text-gray-600">For new and continuing students</p>
              </div>
              <div className="bg-school-accent/20 px-3 py-1 rounded text-school-primary font-medium">
                February 28, 2026
              </div>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Work-Study Position Applications</p>
                <p className="text-sm text-gray-600">For fall semester positions</p>
              </div>
              <div className="bg-school-accent/20 px-3 py-1 rounded text-school-primary font-medium">
                August 1, 2025
              </div>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Financial Aid Verification Documents</p>
                <p className="text-sm text-gray-600">If selected for verification</p>
              </div>
              <div className="bg-school-accent/20 px-3 py-1 rounded text-school-primary font-medium">
                30 days after notification
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Financial Aid Counseling</CardTitle>
          <CardDescription>Our financial aid counselors are available to help you navigate the financial aid process.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Schedule a meeting with a financial aid counselor to discuss your specific situation and explore all available options.</p>
          <Button>Schedule Appointment</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAid;
