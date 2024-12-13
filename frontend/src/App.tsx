import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages

import UserDetail from './pages/user-detail'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import NavBar from './pages/NavBar'
import SettingsPage from './pages/SettingsPage'
import { useEffect } from 'react'
import { useThemeStore } from './store/useThemeStore'
import { useAuthStore } from './store/useAuthStore'
import UserListPage from './pages/userlist'
import Home from './pages/home'
import { RandomUsersTable } from './pages/randomusertable'
import { RandomUserFormPage } from './pages/addrandomuser'


const App = () => {
 const {authUser} = useAuthStore()

  const { theme } = useThemeStore();

  useEffect(() => {
    // Update the theme on the <html> element
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newrandomuser" element={<RandomUserFormPage />} />
        <Route path="/randomusertable" element={<RandomUsersTable />} />
        <Route path="/userlist" element={ !authUser ? <UserListPage /> : <Navigate to="/" />} />
        <Route path="/:id" element={<UserDetail />} />
        <Route path="/settings" element={<SettingsPage /> } />
        <Route path="/api/sign-up" element={ !authUser ? <SignUpPage  /> : <Navigate to="/" />} />
        <Route path="/api/login" element={!authUser ? <SignInPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
