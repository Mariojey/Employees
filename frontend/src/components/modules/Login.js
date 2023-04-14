import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as tokenHandler from '../../modules/TokenHandler';

export default function Login() {
    const initState = {
        email: "",
        password: ""
    };

    const [data, setData] = useState(initState);
    const [remember, setRemeber] = useState(true)
    const [message, setMessage] = useState(` `)

    const navigate = useNavigate();

    function toggleRemember() {
        setRemeber(prevStatus => !prevStatus)
    }

    function handleSubmit(event) {
        event.preventDefault();

        async function checkData() {
            try {
                await fetch(`http://127.0.0.1:8888/api/user/login`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }).then(res => res.json())
                    .then(res => {
                        if (res.status === 'OK') {
                            const user = res.user[0].email;
                            const token = res.token;
                            const role = res.user[0].permission;

                            if (remember) {
                                tokenHandler.saveTokenData(user, token, role)
                            } else {
                                tokenHandler.tempSaveTokenData(user, token, role)
                            }

                            if (role == 'ADMIN') {
                                navigate(`/employees`)
                            } else if (role == 'USER') {
                                navigate(`/employee/${res.user[0]._id}`)
                            }
                        } else {
                            setMessage(`User not found in database`)
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

    return(
        <div className="loginContainer">
            <h1>Login</h1>
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
                    <button 
                        type="submit" 
                        className="btnSubmit"
                        onClick={handleSubmit}
                    >Login</button>
            </form>
            <p>{message}</p>
        </div>
    )
}