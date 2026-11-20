import React from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Products from "./page/Products";
import UserProfile from "./page/UserProfile";
import Cart from "./page/Cart";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./page/AdminDashboard";
import UsersManagement from "./page/UsersManagement";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersManagement />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
