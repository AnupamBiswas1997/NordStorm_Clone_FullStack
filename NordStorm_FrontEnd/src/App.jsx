import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { ProductPage } from "./components/productPage";
import { PrivateRoute } from './components/PrivateRoute'; 
import CartPage from './components/CartPage'; 

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        </Routes>
    </>
  );
}

export default App;
