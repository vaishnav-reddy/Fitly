import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Results from './pages/Results';
import Gallery from './pages/Gallery';
import Chat from './pages/Chat';
import Admin from './pages/Admin';
import React from "react";

export default function App() {
 return (
 <BrowserRouter>
   <Navbar />
   <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/results' element={<Results />} />
     <Route path='/gallery' element={<Gallery />} />
     <Route path='/chat' element={<Chat />} />
     <Route path='/admin' element={<Admin />} />
   </Routes>
 </BrowserRouter>
 );
}