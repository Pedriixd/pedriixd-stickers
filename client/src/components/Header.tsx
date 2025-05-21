import { useState } from 'react';
import logo from '../assets/logo.svg';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (section: string) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        <div className="logo">
          <img src={logo} alt="PEDRIIXD Logo" className="h-10 w-auto" />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <button 
            onClick={() => handleNavClick('customize')}
            className={`font-poppins font-medium px-4 py-2 rounded-full transition duration-300 ease-in-out ${
              activeSection === 'customize' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'
            }`}
          >
            📌 Personaliza tu plancha
          </button>
          <button 
            onClick={() => handleNavClick('gallery')}
            className={`font-poppins font-medium px-4 py-2 rounded-full transition duration-300 ease-in-out ${
              activeSection === 'gallery' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'
            }`}
          >
            🖼️ Galería
          </button>
          <button 
            onClick={() => handleNavClick('pricing')}
            className={`font-poppins font-medium px-4 py-2 rounded-full transition duration-300 ease-in-out ${
              activeSection === 'pricing' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'
            }`}
          >
            📦 Precios
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-md ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
          <button 
            onClick={() => handleNavClick('customize')}
            className={`font-poppins font-medium px-4 py-3 text-left rounded-md transition duration-300 ease-in-out ${
              activeSection === 'customize' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'
            }`}
          >
            📌 Personaliza tu plancha
          </button>
          <button 
            onClick={() => handleNavClick('gallery')}
            className={`font-poppins font-medium px-4 py-3 text-left rounded-md transition duration-300 ease-in-out ${
              activeSection === 'gallery' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'
            }`}
          >
            🖼️ Galería
          </button>
          <button 
            onClick={() => handleNavClick('pricing')}
            className={`font-poppins font-medium px-4 py-3 text-left rounded-md transition duration-300 ease-in-out ${
              activeSection === 'pricing' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'
            }`}
          >
            📦 Precios
          </button>
        </div>
      </div>
    </header>
  );
}
