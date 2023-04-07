import React from "react";
import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";
import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import './ListView.css'
import { Link } from "react-router-dom";

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

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        function fetchData(){
            fetch(`http://127.0.0.1:8888/api/employee`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
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
                                <td><Link to={`/employee/${item._id}`} className="tableLink">{item.firstName}</Link></td>
                                <td><Link to={`/employee/${item._id}`} className="tableLink">{item.lastName}</Link></td>
                                <td><Link to={`/employee/${item._id}`} className="tableLink">{item.email}</Link></td>
                                <td><Link to={`/employee/${item._id}`} className="tableLink">{item.phone}</Link></td>
                                <td><Link to={`/employee/${item._id}`} className="tableLink">{item.salary}</Link></td>
                                <td><Link to={`/employee/${item._id}`} className="tableLink">{item.title}</Link></td>
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