import { useEffect, useState } from 'react';
import { useTaskContext } from './context/TaskContext';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import About from './pages/About';
import './App.css';
import Footer from './components/Footer';

function App() {
  

  return (
    <div className="w-[100vw] h-[100vh] bg-black mx-auto p-10">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
