import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './Auth/helper/AdminRoute';
import PrivateRoute from './Auth/helper/PrivateRoute';
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import Orders from './admin/Orders';
import ManageCategories from './admin/ManageCategories';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './components/Cart';

const App = () => {
  return (
    <div className="route">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/user/dashboard' element={
            <PrivateRoute>
              <UserDashboard/>
            </PrivateRoute>
          }/>
          <Route path='/admin/dashboard' element={
            <AdminRoute>
              <AdminDashboard/>
            </AdminRoute>
          }/>
          <Route path='/admin/create/category' element={
            <AdminRoute>
              <AddCategory/>
            </AdminRoute>
          }/>
          <Route path='/admin/categories' element={
            <AdminRoute>
              <ManageCategories/>
            </AdminRoute>
          }/>
            <Route path='/admin/create/product' element={
            <AdminRoute>
              <AddProduct/>
            </AdminRoute>
          }/>
            <Route path='/admin/products' element={
            <AdminRoute>
              <ManageProducts/>
            </AdminRoute>
          }/>
            <Route path='/admin/orders' element={
            <AdminRoute>
              <Orders/>
            </AdminRoute>
          }/>
          <Route path='/admin/product/update/:productId' element={
            <AdminRoute>
              <UpdateProduct/>
            </AdminRoute>
          }/>
          <Route path='/admin/category/update/:categoryId' element={
            <AdminRoute>
              <UpdateCategory/>
            </AdminRoute>
          }/>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
