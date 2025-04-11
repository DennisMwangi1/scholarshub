
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, Bookmark, List } from 'lucide-react';

interface ClassSession {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  location: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

// Sample timetable data
const classSessions: ClassSession[] = [
  {
    id: '1',
    day: 'Monday',
    startTime: '10:00',
    endTime: '11:30',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    instructor: 'Dr. Smith',
    location: 'Room 101',
    type: 'lecture'
  },
  {
    id: '2',
    day: 'Monday',
    startTime: '14:00',
    endTime: '15:30',
    courseCode: 'PHYS101',
    courseName: 'Introduction to Physics',
    instructor: 'Dr. Brown',
    location: 'Room 203',
    type: 'lecture'
  },
  {
    id: '3',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:30',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    instructor: 'Prof. Johnson',
    location: 'Room 150',
    type: 'lecture'
  },
  {
    id: '4',
    day: 'Tuesday',
    startTime: '14:00',
    endTime: '16:00',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    instructor: 'Dr. Smith',
    location: 'Lab 3',
    type: 'lab'
  },
  {
    id: '5',
    day: 'Wednesday',
    startTime: '10:00',
    endTime: '11:30',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    instructor: 'Dr. Smith',
    location: 'Room 101',
    type: 'lecture'
  },
  {
    id: '6',
    day: 'Wednesday',
    startTime: '13:00',
    endTime: '14:30',
    courseCode: 'ENG105',
    courseName: 'Academic Writing',
    instructor: 'Dr. Williams',
    location: 'Room 120',
    type: 'lecture'
  },
  {
    id: '7',
    day: 'Thursday',
    startTime: '09:00',
    endTime: '10:30',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    instructor: 'Prof. Johnson',
    location: 'Room 150',
    type: 'lecture'
  },
  {
    id: '8',
    day: 'Friday',
    startTime: '11:00',
    endTime: '12:30',
    courseCode: 'ENG105',
    courseName: 'Academic Writing',
    instructor: 'Dr. Williams',
    location: 'Room 120',
    type: 'lecture'
  },
  {
    id: '9',
    day: 'Friday',
    startTime: '14:00',
    endTime: '16:00',
    courseCode: 'PHYS101',
    courseName: 'Introduction to Physics',
    instructor: 'Dr. Brown',
    location: 'Lab 2',
    type: 'lab'
  }
];

const Timetable = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Get class for a specific day and time
  const getClassForTimeSlot = (day: string, hour: string) => {
    return classSessions.filter(session => {
      const sessionStart = parseInt(session.startTime.split(':')[0]);
      const sessionEnd = parseInt(session.endTime.split(':')[0]);
      const currentHour = parseInt(hour.split(':')[0]);
      
      return session.day === day && 
             sessionStart <= currentHour && 
             sessionEnd > currentHour;
    });
  };

  // Calculate the duration of a session in hours (for row spanning)
  const getSessionDuration = (session: ClassSession) => {
    const startHour = parseInt(session.startTime.split(':')[0]);
    const endHour = parseInt(session.endTime.split(':')[0]);
    return endHour - startHour;
  };

  // Helper to generate a color based on course code (for consistency)
  const getCourseColor = (courseCode: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-orange-100 text-orange-800 border-orange-200',
      'bg-pink-100 text-pink-800 border-pink-200'
    ];
    
    // Simple hash function to consistently map course codes to colors
    const hash = courseCode.split('').reduce(
      (acc, char) => char.charCodeAt(0) + acc, 0
    );
    
    return colors[hash % colors.length];
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-school-primary mb-4">Class Timetable</h2>
      
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500">Semester: Fall 2023</p>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant={view === 'grid' ? 'default' : 'outline'} 
            onClick={() => setView('grid')}
          >
            <CalendarIcon className="h-4 w-4 mr-1" /> Grid View
          </Button>
          <Button 
            size="sm" 
            variant={view === 'list' ? 'default' : 'outline'} 
            onClick={() => setView('list')}
          >
            <List className="h-4 w-4 mr-1" /> List View
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {view === 'grid' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Time</TableHead>
                    {days.map(day => (
                      <TableHead key={day}>{day}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hours.map(hour => (
                    <TableRow key={hour}>
                      <TableCell className="font-medium">
                        {hour}
                      </TableCell>
                      
                      {days.map(day => {
                        const sessions = getClassForTimeSlot(day, hour);
                        if (sessions.length === 0) return <TableCell key={day} />;
                        
                        // Check if this is the start hour of the session
                        const firstSessions = sessions.filter(s => s.startTime === hour);
                        if (firstSessions.length > 0) {
                          const session = firstSessions[0];
                          const duration = getSessionDuration(session);
                          const colorClass = getCourseColor(session.courseCode);
                          
                          return (
                            <TableCell 
                              key={day} 
                              className="p-1"
                              rowSpan={duration}
                            >
                              <div className={`p-2 rounded border ${colorClass} h-full`}>
                                <div className="font-semibold">{session.courseCode}</div>
                                <div className="text-xs">{session.location}</div>
                                <div className="text-xs mt-1">
                                  {session.startTime} - {session.endTime}
                                </div>
                              </div>
                            </TableCell>
                          );
                        }
                        
                        // If sessions exist but none start at this hour, it's covered by a rowspan
                        return null;
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="space-y-3">
              {days.map(day => (
                <div key={day}>
                  <h3 className="font-semibold text-lg mb-2">{day}</h3>
                  <div className="space-y-2">
                    {classSessions
                      .filter(session => session.day === day)
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map(session => {
                        const colorClass = getCourseColor(session.courseCode);
                        return (
                          <div 
                            key={session.id} 
                            className={`p-3 rounded border ${colorClass} flex items-center`}
                          >
                            <div className="mr-4 text-center">
                              <div className="font-bold">{session.startTime}</div>
                              <div className="text-xs">to</div>
                              <div className="font-bold">{session.endTime}</div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="font-semibold">{session.courseCode}: {session.courseName}</div>
                              <div className="flex items-center text-sm mt-1">
                                <div className="mr-4">
                                  <span className="font-medium">Location:</span> {session.location}
                                </div>
                                <div>
                                  <span className="font-medium">Type:</span> {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                                </div>
                              </div>
                            </div>
                            
                            <Button size="sm" variant="ghost" className="ml-2">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    {classSessions.filter(session => session.day === day).length === 0 && (
                      <p className="text-gray-500 text-center py-3">No classes scheduled</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;
