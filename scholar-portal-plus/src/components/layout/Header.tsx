
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-school-primary font-bold text-2xl">Scholar</span>
          <span className="text-school-secondary font-bold text-2xl">Portal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-gray-700 hover:text-school-primary ${isActive('/') ? 'font-semibold text-school-primary' : ''}`}
          >
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-school-primary">
              Portals <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <Link to="/login?role=student" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Student Portal
              </Link>
              <Link to="/login?role=lecturer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Lecturer Portal
              </Link>
            </div>
          </div>
          <Link 
            to="/events" 
            className={`text-gray-700 hover:text-school-primary ${isActive('/events') ? 'font-semibold text-school-primary' : ''}`}
          >
            Events & News
          </Link>
          <Link 
            to="/contact" 
            className={`text-gray-700 hover:text-school-primary ${isActive('/contact') ? 'font-semibold text-school-primary' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Login/Register Buttons */}
        <div className="hidden md:flex space-x-2">
          <Button asChild variant="outline" className="border-school-primary text-school-primary hover:bg-school-primary/10">
            <Link to="/register">Register</Link>
          </Button>
          <Button asChild variant="default" className="bg-school-primary hover:bg-school-primary/90">
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-500" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <Link 
              to="/" 
              className={`block py-2 ${isActive('/') ? 'text-school-primary font-semibold' : 'text-gray-700'}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <div className="py-2">
              <h3 className="text-gray-500 font-medium mb-1">Portals</h3>
              <Link 
                to="/login?role=student" 
                className="block pl-3 py-1 text-gray-700"
                onClick={toggleMenu}
              >
                Student Portal
              </Link>
              <Link 
                to="/login?role=lecturer" 
                className="block pl-3 py-1 text-gray-700"
                onClick={toggleMenu}
              >
                Lecturer Portal
              </Link>
            </div>
            <Link 
              to="/events" 
              className={`block py-2 ${isActive('/events') ? 'text-school-primary font-semibold' : 'text-gray-700'}`}
              onClick={toggleMenu}
            >
              Events & News
            </Link>
            <Link 
              to="/contact" 
              className={`block py-2 ${isActive('/contact') ? 'text-school-primary font-semibold' : 'text-gray-700'}`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="pt-2 pb-3 flex space-x-2">
              <Button asChild variant="outline" className="flex-1 border-school-primary text-school-primary hover:bg-school-primary/10">
                <Link to="/register" onClick={toggleMenu}>Register</Link>
              </Button>
              <Button asChild variant="default" className="flex-1 bg-school-primary hover:bg-school-primary/90">
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
