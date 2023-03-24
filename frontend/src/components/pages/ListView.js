import React from "react";
import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";
import { useState, useEffect } from "react";

export default function ListView(){

    const initState = {
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        salary: 0,
        phone: "",
        department: ""
    };

    const [employees, setEmployees] = useState(initState)

    useEffect(() => {
        function fetchData(){
            fetch(`http://127.0.0.1:8888/api/employee`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json)
            .then(data => {
                setEmployees(data)
            })
        }
        fetchData()
    },[])

    return(
        <>
        <Navbar />
        <div className="listView">
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>Salary</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.map(item => {
                        return(
                            <tr key={item._id}>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.salary}</td>
                                <td>{item.title}</td>
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