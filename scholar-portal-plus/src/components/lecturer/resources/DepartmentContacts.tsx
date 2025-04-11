
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DepartmentContacts = () => {
  const navigate = useNavigate();

  // Sample department contact data
  const departments = [
    {
      name: "Computer Science",
      head: "Prof. Alan Turing",
      email: "cs_head@example.edu",
      phone: "+1 (555) 123-4567",
      location: "Building A, Room 301"
    },
    {
      name: "Mathematics",
      head: "Dr. Katherine Johnson",
      email: "math_head@example.edu",
      phone: "+1 (555) 123-4568",
      location: "Building B, Room 204"
    },
    {
      name: "Physics",
      head: "Prof. Richard Feynman",
      email: "physics_head@example.edu",
      phone: "+1 (555) 123-4569",
      location: "Building C, Room 105"
    },
    {
      name: "Biology",
      head: "Dr. Rosalind Franklin",
      email: "biology_head@example.edu",
      phone: "+1 (555) 123-4570",
      location: "Building D, Room 220"
    }
  ];

  // Sample administrative contacts
  const adminContacts = [
    {
      title: "Dean of Faculty",
      name: "Dr. Marie Curie",
      email: "dean@example.edu",
      phone: "+1 (555) 123-4571"
    },
    {
      title: "Academic Affairs Director",
      name: "Dr. Grace Hopper",
      email: "academic_affairs@example.edu",
      phone: "+1 (555) 123-4572"
    },
    {
      title: "Research Coordinator",
      name: "Dr. Jane Goodall",
      email: "research@example.edu",
      phone: "+1 (555) 123-4573"
    },
    {
      title: "Faculty Services",
      name: "Dr. George Washington Carver",
      email: "faculty_services@example.edu",
      phone: "+1 (555) 123-4574"
    }
  ];

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
      
      <h1 className="text-3xl font-bold text-school-secondary mb-6">Department Contacts</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Users className="mr-2 h-5 w-5 text-school-secondary" />
          Academic Departments
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {departments.map((dept, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{dept.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Department Head:</strong> {dept.head}</p>
                <p><strong>Location:</strong> {dept.location}</p>
                <div className="flex items-center mt-4">
                  <Mail className="h-4 w-4 mr-2 text-school-secondary" />
                  <a href={`mailto:${dept.email}`} className="text-school-secondary hover:underline">
                    {dept.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-school-secondary" />
                  <a href={`tel:${dept.phone}`} className="text-school-secondary hover:underline">
                    {dept.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Users className="mr-2 h-5 w-5 text-school-secondary" />
          Administrative Contacts
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {adminContacts.map((contact, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{contact.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Contact Person:</strong> {contact.name}</p>
                <div className="flex items-center mt-4">
                  <Mail className="h-4 w-4 mr-2 text-school-secondary" />
                  <a href={`mailto:${contact.email}`} className="text-school-secondary hover:underline">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-school-secondary" />
                  <a href={`tel:${contact.phone}`} className="text-school-secondary hover:underline">
                    {contact.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Faculty Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Access the complete faculty directory with contact information for all academic and administrative staff.</p>
          <Button>
            Access Full Directory
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentContacts;
