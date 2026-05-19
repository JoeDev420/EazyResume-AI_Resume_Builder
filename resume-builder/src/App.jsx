import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import LoadingSpinner from './components/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const Layout = lazy(() => import('./pages/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'))
const Preview = lazy(() => import('./pages/Preview'))
const Login = lazy(() => import('./pages/Login'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const Premium = lazy(() => import('./pages/Premium'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const Resumes = lazy(() => import('./pages/Resumes'))

const PageSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white">
    <LoadingSpinner color="black" />
  </div>
)

const App = () => {
  return (
    <div>
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='app' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path='builder/:resumeId' element={<ResumeBuilder />} />
          </Route>

          <Route path='resumes' element={<Resumes />} />
          <Route path='view/:resumeSlug' element={<Preview />} />
          <Route path='login' element={<Login />} />
          <Route path='Premium' element={<Premium />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  )
}

export default App
