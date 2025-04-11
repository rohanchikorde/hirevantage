
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!userProfile) return '/dashboard';
    
    switch (userProfile.role) {
      case 'admin':
        return '/dashboard';
      case 'interviewer':
        return '/interviewer';
      case 'candidate':
        return '/interviewee';
      case 'client':
        return '/organization';
      default:
        return '/dashboard';
    }
  };

  const UserMenu = () => (
    <div className="relative group">
      <Button variant="ghost" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
          {userProfile?.full_name?.charAt(0) || 'U'}
        </div>
        <span className="hidden md:inline">{userProfile?.full_name || 'User'}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>
      <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
          <User className="w-4 h-4 mr-2" />
          My Profile
        </Link>
        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Link>
        <button 
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            I
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Intervue
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            to="/about"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors"
          >
            About
          </Link>
          <Link
            to="/pricing"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/request-demo"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors"
          >
            Request Demo
          </Link>
          
          {isAuthenticated ? (
            <>
              <Button
                variant="outline"
                className="ml-4"
                onClick={() => navigate(getDashboardPath())}
              >
                Dashboard
              </Button>
              <UserMenu />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="ml-4"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              className="mr-2"
              onClick={() => navigate(getDashboardPath())}
            >
              Dashboard
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      I
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Intervue
                    </span>
                  </Link>
                </div>
                
                <nav className="flex flex-col space-y-4 py-6">
                  <Link
                    to="/about"
                    className="px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    to="/pricing"
                    className="px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/request-demo"
                    className="px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors"
                  >
                    Request Demo
                  </Link>
                </nav>
                
                <div className="mt-auto py-6 border-t">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="flex items-center px-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium text-lg mr-3">
                          {userProfile?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="font-medium">{userProfile?.full_name || 'User'}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{userProfile?.email}</div>
                        </div>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors"
                      >
                        <User className="w-5 h-5 mr-3" />
                        My Profile
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors"
                      >
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                      </Link>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 px-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate('/login')}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        onClick={() => navigate('/register')}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
