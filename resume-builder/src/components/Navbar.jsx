import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import API from './AxiosConfig';
import UserProfile from './UserProfile';

const Navbar = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const logoutUser = async () => {
    try {
      const response = await API.post('/user/logout', {});

      if (response.data.success) {
        await refreshAuth();
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="shadow bg-white py-4 ">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 text-slate-800">
        
        <Link to="/">
         <img src="/log.png" alt="Logo" className=" h-5 md:h-5 lg:h-5 xl:h-9  w-auto object-contain scale-110 lg:scale-125 xl:scale-150"/>
        </Link>

        <UserProfile logoutUser={logoutUser} />

      </nav>
    </div>
  );
};

export default Navbar;