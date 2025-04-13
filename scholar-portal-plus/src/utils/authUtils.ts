import { toast } from "@/components/ui/use-toast";

// Simulated storage for authenticated users - in a real app, you'd use a proper authentication backend
interface User {
  id: string;
  role: "student" | "lecturer";
  name: string;
  email: string;
  registrationDate?: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
  courses?: string[];
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "student" | "lecturer";
}

// This is a dummy database - in a real app, these would be stored in a secure backend
let authenticatedUser: User | null = null;
const users: Record<string, User> = {
  "student@example.com": {
    id: "ST123456",
    role: "student",
    name: "John Doe",
    email: "student@example.com",
    registrationDate: "2023-09-01",
    department: "Computer Science",
    studentId: "ST123456",
    courses: ["CS101", "MATH201", "ENG105", "PHYS101"],
  },
  "lecturer@example.com": {
    id: "LC789012",
    role: "lecturer",
    name: "Dr. Jane Smith",
    email: "lecturer@example.com",
    registrationDate: "2022-01-15",
    department: "Computer Science",
    employeeId: "LC789012",
    courses: ["CS101", "CS202", "CS303"],
  },
};
