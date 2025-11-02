import './index.css'
import LandingPage from './pages/landingPage';
import Register from './pages/register'
import Login from './pages/login'
import { Route, Routes } from 'react-router-dom';
import DonorDash from './pages/donorDashboard';
import BeneficiaryDash from './pages/beneficiaryDashboard';

const App = () => {
  return ( 
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path='/donor-dashboard' element={<DonorDash/>} />
      <Route path='/beneficiary-dashboard' element={<BeneficiaryDash/>} />
    </Routes>
   );
}
 
export default App;