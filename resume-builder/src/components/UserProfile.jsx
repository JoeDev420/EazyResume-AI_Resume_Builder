import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';


const UserProfile = ({ logoutUser }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
 

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const profilePic = user?.profileImageUrl || null;
  const isPremium = user?.premium || false;
  const userName = user?.name || 'Guest';
  const userEmail = user?.email || '';

  return (
    <div className='flex gap-5 items-center justify-center text-sm'>

    <div className='flex gap-1'>
        <div >Hi,</div>
        <div>{userName}</div>
    </div>

    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 transition-all focus:outline-none ${
          isPremium
            ? 'border-yellow-500 shadow-lg shadow-yellow-500/30'
            : 'border-gray-800'
        }`}
        aria-label="User menu"
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          // Fallback person icon
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border ${isPremium?"border-yellow-400":"border-gray-100"} border-2 py-2 z-50`}>
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {userName}
            </p>
            {userEmail && (
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            )}
          </div>

          {!isPremium && (
            <Link
              to="/premium"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-gray-100 transition"
            >
              Get Premium
            </Link>
          )}

          <Link
            to="/resumes" // Change if your route is different
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-gray-100 transition"
          >
            View Resumes
          </Link>

          <button
            onClick={() => {
              setIsOpen(false);
              logoutUser();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>

    </div>
  );
};

export default UserProfile;