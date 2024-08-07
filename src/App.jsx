import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Products from './Components/Products/Products';
import Inventory from './Components/Inventory';
import Categories from './Components/Products/Categories';
import Variations from './Components/Products/Variations';
import Collections from './Components/Products/Collections';
import Orders from './Components/Orders';
import Appointments from './Components/Appointments';
import Coupons from './Components/Coupons';
import Campaign from './Components/Campaign';
import Profile from './Components/Profile';
import PreOrder from './Components/PreOrder';
import Delivery from './Components/Delivery';
import Rating from './Components/Rating';
import ManageAppointments from './Components/Appointments/ManageAppointments';
import { SearchProvider } from './Components/Context/StateManagement';



function App() {
  return (
    
      <SearchProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>Welcome to Cnex Admin DashBoard This Site is currently being Built so samoe features might not yet be available</div>} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/variations" element={<Variations />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/appointments/*" element={<Appointments />} />
        <Route path="/coupon" element={<Coupons />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Preorder" element={<PreOrder />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/Rating" element={<Rating />} />
        {/* Add more routes here */}
      </Route>
    </Routes>
      </SearchProvider>
  );
}

export default App;
