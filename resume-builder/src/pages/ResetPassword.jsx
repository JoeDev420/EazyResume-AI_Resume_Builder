import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../components/AxiosConfig';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const ResetPassword = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token');


    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [expired,setExpired] = useState(false)

    // 🔐 Verify token on page load
    useEffect(() => {
        if (!token) {

        setMessage('Invalid or missing reset token.');
        setVerifying(false);
        return;
        }

        const verifyToken = async () => {
        try {
            await API.post('/user/resetTokenVerify', { token });
            setVerified(true);
        } catch (error) {
            setMessage(
            error.response?.data?.message || 'Reset link is invalid or expired.'
            );
            setExpired(true)
        } finally {
            setVerifying(false);
        }
        };

        verifyToken();
    }, [token]);

    // 🔄 Submit new password
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password.length < 6) {
        setMessage('Password must be at least 6 characters.');
        return;
        }

        if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
        }

        try {
        setLoading(true);
        setMessage('');

        await API.post('/user/change-password', {
            token,    //here token is used to find out for which user to change the password
            password,
        });

        setMessage('Password reset successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
        setMessage(
            error.response?.data?.message || 'Failed to reset password.'
        );
        } finally {
        setLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="sm:w-[350px] w-full bg-white border border-gray-300/60 rounded-2xl px-8 py-10 shadow-md">

        
            {verifying && (
            <p className="text-center text-gray-600">Verifying reset link...</p>
            )}


            {!verifying && !verified && (
        <div className='flex flex-col items-center justify-center gap-4'>
            <p className="text-center text-red-500">{message}</p>
            <Link to="/forgot-password" className="text-blue-600 underline hover:text-blue-800">Send Request Again</Link>
        </div>
            )}


            {!verifying && verified && (
            <>
                <h2 className="text-gray-900 text-2xl font-semibold mb-6 text-center">
                Reset Password
                </h2>

                <form onSubmit={handleSubmit} className={`${expired?"hidden":""} flex flex-col gap-4`}>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-full px-5 h-12 outline-none"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 rounded-full px-5 h-12 outline-none"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 h-11 rounded-full bg-indigo-500 text-white hover:opacity-90 transition-opacity disabled:opacity-60 relative"
                >
                    {loading ? <LoadingSpinner /> : 'Reset Password'}
                </button>

                {message && (
                    <p className="text-sm text-center text-red-500 mt-2">
                    {message}
                    </p>
                )}
                </form>
            </>
            )}
        </div>
        </div>
    );

};

export default ResetPassword;
