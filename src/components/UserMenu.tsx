import React, { useState } from 'react';
import { User, LogOut, Settings, BookOpen, ChevronDown } from 'lucide-react';
import { User as UserType } from '../types/auth';

interface UserMenuProps {
  user: UserType;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all"
      >
        <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
        <span className="font-medium hidden sm:block">{user.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-gray-700">
              <BookOpen className="h-4 w-4" />
              <span>My Bookings</span>
            </button>
            
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-gray-700">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
            
            <hr className="my-2" />
            
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;