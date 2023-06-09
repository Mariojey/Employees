import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as tokenHandler from '../../modules/TokenHandler';


import './Panel.css'
export default function Register() {
    const initState = {
        email: "",
        password: "",
    };

    const [data, setData] = useState(initState);
    const [remember, setRemeber] = useState(true)
    const [message, setMessage] = useState(` `)
    const [passwordMessage, setPasswordMessge] = useState(``)

    const navigate = useNavigate();

    function toggleRemember() {
        setRemeber(prevStatus => !prevStatus)
    }

    function handleSubmit(event) {
        event.preventDefault();

        function checkData() {
            try {
                fetch(`http://127.0.0.1:8888/api/user`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }).then(res => res.json())
                    .then(res => {
                        if (res.status == 'OK') {
                            const user = res.user.email;
                            const token = res.token;
                            const role = res.user.permission;

                            if (remember) {
                                tokenHandler.saveTokenData(user, token, role)
                            } else {
                                tokenHandler.tempSaveTokenData(user, token, role)
                            }

                            if (role == 'ADMIN') {
                                navigate(`/employees`)
                            } else if (role == 'USER') {
                                navigate(`/`)
                            }
                        } else {
                            setMessage(`Soething went wrong please check data again!`)
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        checkData()
    }
    function handleChange(event) {
        setData({...data, [event.target.name]: event.target.value});
    }
    function isSamePassword(event){
        if (event.target.value != data.password) {
            passwordMessage('Password values must be the same!')
        }else{
            passwordMessage('')
        }
    }

    return(
        <div className="background">
            <div className="loginContainer">
                <h1>Register</h1>
                <form className="form" onSubmit={handleSubmit}>
                        <input 
                            type="email"
                            name="email"
                            required
                            value={data.email}
                            placeholder="Write your email here"
                            className="formInput"
                            onChange={handleChange}
                            />
                        <input 
                            type="password"
                            name="password"
                            required
                            value={data.password}
                            placeholder="Write your password here"
                            className="formInput"
                            onChange={handleChange}
                            />
                        <input 
                            type="password"
                            name="passwordRepeat"
                            required
                            placeholder="Re-write your password here"
                            className="formInput"
                            onChange={isSamePassword}
                            />
                        <p>{passwordMessage}</p>
                        <button 
                            type="submit" 
                            className="btnSubmit"
                            value="Zaloguj"

                        ></button>
                </form>
                <p>{message}</p>
           </div>
        </div>
        
    )
}