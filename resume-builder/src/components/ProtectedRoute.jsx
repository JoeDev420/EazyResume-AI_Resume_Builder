import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import LoadingSpinner from './LoadingSpinner'

//Protected Route is the gatekeeper

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth
    ? children
    : <Navigate to={`/login?redirect=${location.pathname}`} replace />;
};

export default ProtectedRoute