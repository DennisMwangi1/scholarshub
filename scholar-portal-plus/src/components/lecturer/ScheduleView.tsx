
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Clock, MapPin, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample schedule data - in a real app this would come from an API
const initialSchedule = [
  {
    id: 'S001',
    courseCode: 'CS101',
    title: 'Lecture: Introduction to Programming',
    date: new Date(2023, 5, 15),
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    location: 'Room 101',
    type: 'Lecture'
  },
  {
    id: 'S002',
    courseCode: 'CS101',
    title: 'Lab: Basic Programming Exercises',
    date: new Date(2023, 5, 17),
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    location: 'Computer Lab 3',
    type: 'Lab'
  },
  {
    id: 'S003',
    courseCode: 'CS205',
    title: 'Lecture: Arrays and Linked Lists',
    date: new Date(2023, 5, 16),
    startTime: '1:00 PM',
    endTime: '2:30 PM',
    location: 'Room 203',
    type: 'Lecture'
  },
  {
    id: 'S004',
    courseCode: 'CS310',
    title: 'Lecture: SQL Fundamentals',
    date: new Date(2023, 5, 18),
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    location: 'Room 105',
    type: 'Lecture'
  }
];

interface ScheduleViewProps {
  selectedCourse: string | null;
  onClearFilter: () => void;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ selectedCourse, onClearFilter }) => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newEvent, setNewEvent] = useState({
    title: '',
    courseCode: selectedCourse || '',
    startTime: '09:00',
    endTime: '10:30',
    location: '',
    type: 'Lecture'
  });
  const { toast } = useToast();

  const filteredSchedule = selectedCourse
    ? schedule.filter(event => event.courseCode === selectedCourse)
    : schedule;

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.courseCode || !newEvent.location || !selectedDate) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields"
      });
      return;
    }

    // Format times for display
    const formattedStartTime = format(new Date(`2023-01-01T${newEvent.startTime}`), 'h:mm a');
    const formattedEndTime = format(new Date(`2023-01-01T${newEvent.endTime}`), 'h:mm a');

    // In a real app, this would be an API call to create the event
    const newScheduleItem = {
      id: `S${Math.floor(Math.random() * 1000)}`,
      courseCode: newEvent.courseCode,
      title: newEvent.title,
      date: selectedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      location: newEvent.location,
      type: newEvent.type
    };

    setSchedule([...schedule, newScheduleItem]);
    setIsAddEventDialogOpen(false);
    setNewEvent({
      title: '',
      courseCode: selectedCourse || '',
      startTime: '09:00',
      endTime: '10:30',
      location: '',
      type: 'Lecture'
    });

    toast({
      title: "Event created",
      description: "Your schedule has been updated successfully"
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-school-secondary">Class Schedule</h2>
          {selectedCourse && (
            <p className="text-gray-600">Filtered by: {selectedCourse}</p>
          )}
        </div>

        <div className="mt-2 md:mt-0 flex gap-2">
          <Button variant="outline" onClick={onClearFilter}>
            {selectedCourse ? 'Show All' : 'All Courses'}
          </Button>
          <Button
            className="bg-school-secondary hover:bg-school-secondary/90"
            onClick={() => setIsAddEventDialogOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add to Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1  gap-6">


        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Upcoming Classes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedule.length > 0 ? (
                  filteredSchedule.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{format(event.date, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{event.startTime} - {event.endTime}</TableCell>
                      <TableCell>{event.courseCode}</TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {event.location}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      No scheduled classes for this period
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add to Schedule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="event-course">Course</Label>
              <select
                id="event-course"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newEvent.courseCode}
                onChange={(e) => setNewEvent({ ...newEvent, courseCode: e.target.value })}
              >
                <option value="" disabled>Select a course</option>
                <option value="CS101">CS101 - Introduction to Computer Science</option>
                <option value="CS205">CS205 - Data Structures and Algorithms</option>
                <option value="CS310">CS310 - Database Systems</option>
                <option value="CS405">CS405 - Artificial Intelligence</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-title">Title</Label>
              <Input
                id="event-title"
                placeholder="E.g., Lecture: Introduction to Variables"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-date">Date</Label>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                <span>
                  {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-start">Start Time</Label>
                <Input
                  id="event-start"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-end">End Time</Label>
                <Input
                  id="event-end"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                placeholder="E.g., Room 101 or Computer Lab 3"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-type">Type</Label>
              <select
                id="event-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab Session</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Exam">Exam</option>
                <option value="Office Hours">Office Hours</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>Cancel</Button>
            <Button className="bg-school-secondary hover:bg-school-secondary/90" onClick={handleAddEvent}>Add to Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScheduleView;
