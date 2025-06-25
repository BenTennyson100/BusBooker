import React, { useState } from 'react';
import { Bus, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const { user, isAuthenticated, login, register, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <Bus className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">BusBooker</h1>
                <p className="text-xs text-red-100">Your Travel Partner</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-red-200 transition-colors font-medium">Home</a>
              <a href="#" className="hover:text-red-200 transition-colors font-medium">My Bookings</a>
              <a href="#" className="hover:text-red-200 transition-colors font-medium">Help</a>
              
              {isAuthenticated && user ? (
                <UserMenu user={user} onLogout={logout} />
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  Sign In
                </button>
              )}
            </nav>

            <button 
              className="md:hidden p-2"
              onClick={onMenuToggle}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-red-700 border-t border-red-500">
            <div className="px-4 py-3 space-y-3">
              <a href="#" className="block hover:text-red-200 transition-colors font-medium">Home</a>
              <a href="#" className="block hover:text-red-200 transition-colors font-medium">My Bookings</a>
              <a href="#" className="block hover:text-red-200 transition-colors font-medium">Help</a>
              
              {isAuthenticated && user ? (
                <div className="pt-2 border-t border-red-600">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">{user.name.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full text-left text-red-200 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
        onRegister={register}
      />
    </>
  );
};

export default Header;