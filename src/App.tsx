import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthyMeals from './pages/HealthyMeals';
import QuickRecipes from './pages/QuickRecipes';
import Desserts from './pages/Desserts';
import HealthProfile from './pages/HealthProfile';
import Index from './pages/Index';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/healthy-meals" element={<HealthyMeals />} />
          <Route path="/quick-recipes" element={<QuickRecipes />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/health-profile" element={<HealthProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;