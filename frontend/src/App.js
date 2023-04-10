import React, { useEffect, useState } from 'react';

//Import Stylesheet
import './App.css';

//Import Tools
import { Route, Routes, useNavigate } from 'react-router-dom'

//Import Components
import Navbar from './components/elements/Navbar';
import Footer from './components/elements/Footer';

import * as tokenHandler from './modules/TokenHandler';

import Home from './components/pages/Home';
import Add from './components/modules/Add.employee';
import ListView from './components/pages/ListView';
import Card from './components/pages/CardEmployee';
import EditCard from './components/modules/EditEmployee';
import Login from './components/modules/Login';
import Register from './components/modules/Register';


function App() {

  const [logged, setLogged] = useState(false)
  const [roleAdmin, setRoleAdmin] = useState(false)

  const navigate = useNavigate();

  function verifyCredentials(){
    tokenHandler.verifyCredentials()
    .then(data => {
      if(data.status === 'OK'){
        if(data.role === 'ADMIN'){
          setLogged(true)
          setRoleAdmin(true)
          console.log(data);
          navigate('/employees')
        }else if(data.role === 'USER'){
          setLogged(true)
          setRoleAdmin(false)
          console.log(data);
          navigate(`/`)
        }else{
          navigate('/login')
        }
      }
    })
  }

  useEffect(() => {
    verifyCredentials();
  },[])

  return (
    <div className="App">
      
      {logged ? (

        roleAdmin ? (
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/api" />
          <Route path="/employees" element={<ListView/>}/>
          <Route path="/employees/new" element={<Add />} />
          <Route path="/employee/:_id" element={<Card />}/>
          <Route path="/employee/:_id/edit" element={<EditCard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        ) : (
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/api" />
          <Route path="/employee/:_id" element={<Card />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        )

      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      )}
        

            
    </div>
  )
}

export default App;
