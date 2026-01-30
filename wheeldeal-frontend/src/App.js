import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage/HomePage'
import BuyCar from './pages/BuyCar/BuyCar';
import SellCar from './pages/SellCar/SellCar'
import ViewProfile from './pages/ViewProfile/ViewProfile';
import EditProfile from './pages/EditProfile/EditProfile';
import AboutUs from './pages/AboutUs/AboutUs';

function App() {
  return (
    <Router>
      <Routes>

        {/* Homepage with car list */}
        <Route 
          path="/" 
          element={
            <Layout>
              <HomePage /> 
            </Layout>
          } 
        />

        <Route 
          path="/ViewProfile" 
          element={
            <Layout>
              <ViewProfile /> 
            </Layout>
          } 
        />

        <Route 
          path="/EditProfile" 
          element={
            <Layout>
              <EditProfile /> 
            </Layout>
          } 
        />

        <Route 
          path="/BuyCar" 
          element={
            <Layout>
              <BuyCar /> 
            </Layout>
          } 
        />

        <Route 
          path="/SellCar" 
          element={
            <Layout>
              <SellCar /> 
            </Layout>
          } 
        />

        <Route 
          path="/AboutUs" 
          element={
            <Layout>
              <AboutUs /> 
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
