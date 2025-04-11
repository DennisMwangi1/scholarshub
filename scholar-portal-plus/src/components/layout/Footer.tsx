
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-school-primary text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-white font-bold text-2xl">Scholar</span>
              <span className="text-school-accent font-bold text-2xl">Portal</span>
            </div>
            <p className="mb-4 text-gray-300">
              Providing quality education and resources to empower the next generation of leaders and innovators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-school-accent transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-school-accent transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-school-accent transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-school-accent transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-school-accent transition">Home</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-school-accent transition">Events & News</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-school-accent transition">Contact Us</Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-school-accent transition">Academic Calendar</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-school-accent transition">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">Portals</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login?role=student" className="text-gray-300 hover:text-school-accent transition">Student Portal</Link>
              </li>
              <li>
                <Link to="/login?role=lecturer" className="text-gray-300 hover:text-school-accent transition">Lecturer Portal</Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-school-accent transition">Library Resources</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-school-accent transition">Alumni Network</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-school-accent transition">Career Services</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-school-accent flex-shrink-0" />
                <span className="text-gray-300">123 Campus Drive, University District, Education City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-school-accent" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-school-accent transition">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-school-accent" />
                <a href="mailto:info@scholarportal.edu" className="text-gray-300 hover:text-school-accent transition">info@scholarportal.edu</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Scholar Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
