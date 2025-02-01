import React from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css';
import AllFlights from './Pages/AllFlights';
import Flightsdetails from './Pages/Flightsdetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllFlights/>}/>
        <Route path='/flightsDetails' element={<Flightsdetails/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
