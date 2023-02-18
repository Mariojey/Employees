import React from 'react';

//Import Stylesheet
import './App.css';

//Import Tools
import { Router, Route, Routes } from 'react-router-dom'

//Import Components
import Navbar from './components/elements/Navbar';
import Footer from './components/elements/Footer';

import Home from './components/pages/Home';
import Add from './components/modules/Add.employee';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/api"></Route>
          <Route exact path="/employees"></Route>
          <Route exact path="/employees/new" element={<Add />}></Route>
          <Route exact path="/employee/:_id"></Route>
          <Route exact path="/employee/:_id/edit"></Route>
        </Routes>
        <Footer />
      </Router>      
    </div>
  );
}

export default App;
