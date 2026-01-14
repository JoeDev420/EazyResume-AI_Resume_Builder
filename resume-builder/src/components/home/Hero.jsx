import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import API from '../AxiosConfig';
import UserProfile from '../UserProfile';

const Hero = () => {
    
  const navigate = useNavigate();
  const { user, isAuth, refreshAuth } = useAuth(); // isAuth or !!user

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
    <>
      <div className="min-h-screen pb-20" >
        <nav className="z-50 flex items-center justify-between w-full px-6 py-4 md:px-16 lg:px-24 xl:px-40 text-sm">
          <Link to="/">
            <img src="/log.png" alt="Logo" className="h-5 md:h-5 lg:h-7 xl:h-9  w-auto object-contain scale-110 lg:scale-125 xl:scale-150"
/>
          </Link>

          <div className="hidden md:flex items-center gap-24 text-slate-800">
            <a href="#" className="hover:text-blue-500 transition">Home</a>
            <a href="#features" className="hover:text-blue-500 transition">Features</a>
            <a href="#contact" className="hover:text-blue-500 transition">Contact Us</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuth || user ? (
              <UserProfile logoutUser={logoutUser} />
            ) : (
              <>
                <Link
                  to="/app?state=register"
                  className="px-6 py-2 bg-blue-400 hover:bg-blue-500 active:scale-95 transition-all rounded-full text-white"
                >
                  Get started
                </Link>
                <Link
                  to="/login?state=login"
                  className="px-6 py-2 border border-slate-300 hover:bg-slate-50 active:scale-95 transition-all rounded-full text-slate-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black mt-20 md:mt-30">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-blue-400 blur-[100px] opacity-30"></div>

          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center md:leading-[70px]">
            Land your dream job with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent text-nowrap">
              AI-powered
            </span>{' '}
            resumes.
          </h1>

          <p className="max-w-md text-center text-base my-7">
            Create, edit and download professional resumes with AI-powered assistance
          </p>

          <div className="flex items-center gap-4">
            <Link
              to={isAuth || user ? '/app' : '/app?state=register'}
              className="bg-blue-400 hover:bg-blue-500 text-white rounded-full px-9 h-12 flex items-center transition-all active:scale-95"
            >
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-2 size-5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

          * {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
    </>
  );
};

export default Hero;