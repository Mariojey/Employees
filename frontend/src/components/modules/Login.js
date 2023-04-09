import React, { useState } from "react";

export default function Login() {
    const initState = {
        email: "",
        password: ""
    };

    const [data, setData] = useState(initState);

    const navigate = useNavigation();

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
                        if (res.length > 0) {

                        }
                    })
            } catch {

            }
        }
    }
}