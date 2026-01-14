import React, { useState } from 'react';
import API from '../components/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // success or error
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

      setLoading(true)

      const response = await API.post('/user/forgot-password', { email });


      setMessage('If an account exists, you will receive a password reset email shortly');

      setLoading(false)


       
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="sm:w-[350px] w-full bg-white border border-gray-300/60 rounded-2xl px-8 py-10 flex flex-col items-center shadow-md">
        <h2 className="text-gray-900 text-2xl font-semibold mb-6">Forgot Password</h2>

        <form onSubmit={handleSubmit} className={`${message?`hidden`:``} w-full flex flex-col gap-4`}>
          <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail-icon"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none outline-none ring-0 w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`relative text-center mt-2 w-full h-11 rounded-full text-white hover:opacity-90 transition-opacity bg-indigo-500 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? <LoadingSpinner /> : 'Send Reset Link'}
          </button>

          
        </form>
            {message && (
            <p>
              {message}
            </p>
          )}


        <p className="text-gray-500 text-sm mt-6">
          Remembered your password?{' '}
          <a href="/login" className="text-indigo-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
