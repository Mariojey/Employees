import React from 'react';

//Import Stylesheet
import './App.css';

//Import Tools
import { Route, Routes } from 'react-router-dom'

//Import Components
import Navbar from './components/elements/Navbar';
import Footer from './components/elements/Footer';

import Home from './components/pages/Home';
import Add from './components/modules/Add.employee';
import ListView from './components/pages/ListView';
import Card from './components/pages/CardEmployee';
import EditCard from './components/modules/EditEmployee';

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/api" />
          <Route path="/employees" element={<ListView/>}/>
          <Route path="/employees/new" element={<Add />} />
          <Route path="/employee/:_id" element={<Card />}/>
          <Route path="/employee/:_id/edit" element={<EditCard />} />
        </Routes>

            
    </div>
  )
}

export default App;
