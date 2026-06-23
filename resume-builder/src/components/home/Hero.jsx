import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import API from '../AxiosConfig';
import UserProfile from '../UserProfile';

const Hero = () => {

  const navigate = useNavigate();
  const { user, isAuth, refreshAuth } = useAuth();

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
      <div className="min-h-screen pb-20">
        {/* Nav */}
        <nav className="z-50 flex items-center justify-between w-full px-5 py-4 md:px-16 lg:px-24 xl:px-40 text-sm">
          <Link to="/">
            <img
              src="/log.png"
              alt="Logo"
              className="h-5 md:h-5 lg:h-7 xl:h-9 w-auto object-contain scale-110 lg:scale-125 xl:scale-150"
            />
          </Link>

          {/* Desktop nav */}
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
                  to="/login"
                  className="px-6 py-2 border border-slate-300 hover:bg-slate-50 active:scale-95 transition-all rounded-full text-slate-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile nav — show login or profile */}
          <div className="flex md:hidden items-center gap-2">
            {isAuth || user ? (
              <UserProfile logoutUser={logoutUser} />
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 border border-slate-300 hover:bg-slate-50 active:scale-95 transition-all rounded-full text-slate-700 text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-16 lg:px-24 xl:px-40 text-black mt-14 sm:mt-20 md:mt-28">
          <div className="absolute top-20 xl:top-10 -z-10 left-1/4 size-56 sm:size-72 xl:size-120 2xl:size-132 bg-blue-400 blur-[80px] sm:blur-[100px] opacity-30" />

          <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-5xl text-center leading-tight md:leading-[70px]">
            Land your dream job with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              AI-powered
            </span>{' '}
            resumes.
          </h1>

          <p className="max-w-sm sm:max-w-md text-center text-sm sm:text-base mt-5 mb-7 text-slate-600">
            Create, edit and download professional resumes with AI-powered assistance
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full px-8 h-11 sm:h-12 flex items-center justify-center transition-all active:scale-95 text-sm sm:text-base"
            >
              Contact Us
            </button>
            <Link
              to={isAuth || user ? '/app' : '/app?state=register'}
              className="w-full sm:w-auto bg-blue-400 hover:bg-blue-500 text-white rounded-full px-8 h-11 sm:h-12 flex items-center justify-center transition-all active:scale-95 text-sm sm:text-base"
            >
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 size-4 sm:size-5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  );
};

export default Hero;
