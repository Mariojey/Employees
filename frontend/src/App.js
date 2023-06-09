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
import ListAccounts from './components/pages/ListAccounts';
import Account from './components/pages/Account';
import EditAccount from './components/modules/EditAccount';

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
          navigate('/')
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
          <Route path="/home" element={<Home />}/>
          <Route path="/employees" element={<ListView/>}/>
          <Route path="/employees/new" element={<Add />} />
          <Route path="/employee/:_id" element={<Card />}/>
          <Route path="/employee/:_id/edit" element={<EditCard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<ListAccounts />} />
          <Route path='/account/:_id' element={<EditAccount />} />
          <Route path='/myaccount/:_id' element={<Account />} />
        </Routes>
        ) : (
          <Routes>
          <Route exact path="/" element={<Card />} />
          <Route path="/api" />
          <Route path="/employee/:_id" element={<Card />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/myaccount/:_id' element={<Account />} />
        </Routes>
        )

      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/employees" element={<Login/>}/>
          <Route path="/employees/new" element={<Login />} />
          <Route path="/employee/:_id" element={<Login />}/>
          <Route path="/employee/:_id/edit" element={<Login />} />
        </Routes>

      )}
        

            
    </div>
  )
}

export default App;
