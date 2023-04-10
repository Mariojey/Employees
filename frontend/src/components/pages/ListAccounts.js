import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";

export default function ListAccounts() {
    const initState = {
        email: "",
        role: ""
    };

    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        function fetchData() {
            fetch(`http://127.0.0.1:8888/api/user`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(data => {
                    setAccounts(data)
                })
        }
        fetchData()
    }, [])

    return(
        <>
            <Navbar />
            <div className="listView">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts && accounts.map(item => {
                            return(
                                <tr key={item._id}>
                                    <td><Link to={`/account/${item._id}`} className="tableLink">{item.email}</Link></td>
                                    <td><Link to={`/account/${item._id}`} className="tableLink">{item.role}</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                    
                    
            </div>
            <Footer />
        </>
    )
}