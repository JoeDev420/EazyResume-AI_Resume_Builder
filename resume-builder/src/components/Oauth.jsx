import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import API from './AxiosConfig'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import LoadingSpinner from './LoadingSpinner'


const Oauth = ({redirectPath,formLoading,setOauthLoad,oauthLoad}) => {

  const {refreshAuth} = useAuth()
  const navigate = useNavigate()

  const responseGoogle = async(authResult)=>{
    try {
      setOauthLoad(true)
      const response = await API.post("/Oauth/getUserDetails",{code:authResult.code})

      if(response.data.success){
        await refreshAuth()
        navigate(redirectPath || "/app")
        setOauthLoad(false)
      }
    }
    catch (error) { 
      setOauthLoad(false)
    }
  }

  const GoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error('Login error:', error);
    },
    flow: 'auth-code'
  })

  return (
    <div className='w-50 h-11'>

      <button
        disabled={formLoading}
        className={`
          relative
          w-full
          h-11
          border
          border-black
          rounded-2xl
          flex items-center justify-center gap-2
          ${formLoading ? "bg-gray-300 cursor-not-allowed" : "bg-red-300"}
        `}
        onClick={GoogleLogin}
      >
        {oauthLoad 
  ? <LoadingSpinner color={"black"}/> 
  : (
    <div className='flex items-center'>
      <svg
        width="18"
        height="18"
        viewBox="0 0 48 48"
        className="mr-2"
      >
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.02 1.53 7.4 2.8l5.5-5.5C33.54 3.7 29.1 1.5 24 1.5 14.94 1.5 7.1 6.9 3.4 14.7l6.4 5c1.9-5.6 7.2-10.2 14.2-10.2z"/>
        <path fill="#4285F4" d="M46.5 24.5c0-1.5-.14-2.6-.43-3.8H24v7.2h12.8c-.26 2.1-1.7 5.2-4.9 7.3l7.5 5.8c4.4-4.1 7.1-10.1 7.1-16.5z"/>
        <path fill="#FBBC05" d="M9.8 28.9c-.5-1.5-.9-3.1-.9-4.9s.3-3.4.9-4.9l-6.4-5C1.6 17.6.5 20.7.5 24s1.1 6.4 2.9 9.9l6.4-5z"/>
        <path fill="#34A853" d="M24 46.5c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2 1.4-4.6 2.4-8.4 2.4-7 0-12.3-4.6-14.2-10.2l-6.4 5c3.7 7.8 11.5 13.2 20.6 13.2z"/>
      </svg>
      Continue with Google
    </div>
  )
}

      </button>

    </div>
  )
}

export default Oauth
