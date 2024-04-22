
import './App.css';
// import './styles/base/global.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Verify from './pages/auth/VerifyMail';
import Dashboard from './pages/dashboard';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function App() {
  return (
    <>
    <ToastContainer position="top-right" />
    <Routes>
    <Route exact path="/" element={
      
      <Navigate to={cookies.get('token') ? "/dashboard":"/signin"} />
    } />
    <Route path="/signin" element={<Login isLogin={true} />} />
    <Route path="/signup" element={<Login isLogin={false} />} />
    <Route path="/verify/:token" element={<Verify  />} />

    <Route path="/dashboard" element={
    <RequireAuth>
    
    <Dashboard />
    </RequireAuth>
    
    } />
    </Routes>
    </>
  );
}
function RequireAuth ({children}){
    return cookies.get('token') ? children :<>
    {sessionStorage.clear()}
    <Navigate to='/signin' />
    </>
    
}

export default App;
