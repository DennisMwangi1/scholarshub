
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentPortal from "./pages/StudentPortal";
import LecturerPortal from "./pages/LecturerPortal";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Student resources
import Handbook from "./components/student/resources/Handbook";
import LibraryAccess from "./components/student/resources/LibraryAccess";
import FinancialAid from "./components/student/resources/FinancialAid";
import ITSupport from "./components/student/resources/ITSupport";

// Lecturer resources
import LecturerHandbook from "./components/lecturer/resources/Handbook";
import ResearchGuidelines from "./components/lecturer/resources/ResearchGuidelines";
import TeachingResources from "./components/lecturer/resources/TeachingResources";
import DepartmentContacts from "./components/lecturer/resources/DepartmentContacts";
import LecturerITServices from "./components/lecturer/resources/ITServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/lecturer-portal" element={<LecturerPortal />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Student Resources Routes */}
          <Route path="/student-resources/handbook" element={<Handbook />} />
          <Route path="/student-resources/library" element={<LibraryAccess />} />
          <Route path="/student-resources/financial-aid" element={<FinancialAid />} />
          <Route path="/student-resources/it-support" element={<ITSupport />} />
          
          {/* Lecturer Resources Routes */}
          <Route path="/lecturer-resources/handbook" element={<LecturerHandbook />} />
          <Route path="/lecturer-resources/research-guidelines" element={<ResearchGuidelines />} />
          <Route path="/lecturer-resources/teaching-resources" element={<TeachingResources />} />
          <Route path="/lecturer-resources/department-contacts" element={<DepartmentContacts />} />
          <Route path="/lecturer-resources/it-services" element={<LecturerITServices />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
