import {Routes,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Transactions from './pages/Transactions';
import Admin from './pages/Admin';
import HomeSection from './pages/HomeSection';

function App() {
  const ProtectedRoutes = ({ children }) => {
    if(localStorage.getItem("user")){
      return children;
    }else{
      return <Navigate to="/login" />;
    }
  };

  const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.role === 'admin'){
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes> <HomeSection /> </ProtectedRoutes>} />
        <Route path='/about' element={<ProtectedRoutes> <About /> </ProtectedRoutes>} />
        <Route path='/transactions' element={<ProtectedRoutes> <Transactions /> </ProtectedRoutes>} />
        <Route path='/admin' element={<ProtectedRoutes><AdminRoute><Admin /></AdminRoute></ProtectedRoutes>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login redirectTo="/" />} />
      </Routes>
    </>
  );
}

export default App;
