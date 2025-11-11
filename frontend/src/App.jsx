import './index.css'
import LandingPage from './pages/landingPage';
import Register from './pages/register'
import Login from './pages/login'
import { Route, Routes } from 'react-router-dom';
import DonorDash from './pages/donorDashboard';
import BeneficiaryDash from './pages/beneficiaryDashboard';
import ProfilePage from './pages/profile';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return ( 
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path='/donor-dashboard' element={<DonorDash/>} />
      <Route path='/beneficiary-dashboard' element={<BeneficiaryDash/>} />
      <Route path='profile' element={<ProfilePage/>} />
    </Routes>
    <ToastContainer
         position="top-right"
         autoClose={3000}        // auto close after 3s
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         pauseOnHover
         draggable
         theme="colored"  
    />
    </>
   );
}
 
export default App;