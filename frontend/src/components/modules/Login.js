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
                                navigate(`/employee/${res.user._id}`)
                            }
                        } else {
                            setMessage(`User not found in database`)
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }
}