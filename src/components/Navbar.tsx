
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ChevronRight, BarChart2, Search, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Analysis', path: '/analysis', icon: <Search size={18} /> },
    { name: 'Trends', path: '/trends', icon: <BarChart2 size={18} /> }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-medium text-lg group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
            <span className="hidden sm:inline-block">Political Sentiment</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 px-1 py-1.5 text-sm font-medium transition-all hover:text-primary relative",
                  location.pathname === item.path 
                    ? "text-primary" 
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
                {location.pathname === item.path && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-all"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-lg shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-3 rounded-md font-medium transition-all",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/70 hover:bg-secondary/50"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
