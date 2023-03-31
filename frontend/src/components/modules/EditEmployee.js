import React, { useEffect, useState } from "react";

import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";
import { useNavigate, useParams } from "react-router-dom";

import './Add.employee.css'

export default function EditCard(){
    
    const initState = {
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        salary: 0,
        phone: "",
        department: ""
    };

    const {_id} = useParams()

    const [data, setData] = useState([initState])

    const navigate = useNavigate()

    useEffect(() => {
        function fetchData() {
            fetch(`http://127.0.0.1:8888/api/employee/${_id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                setData(data)
            })
        }
        fetchData()
    },[])

    function handleSubmit(event) {
        event.preventDefault();

        function postEmployee(){
            try{
                fetch(`http://127.0.0.1:8888/api/employee/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .then(res => {
                    navigate(`/employee/${res._id}`);
                })
                
            }catch(error){
                console.log(`Ups! Something went wrong 🥺`, error);
            }
        }
        postEmployee();
    }

    function handleChange(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    function handleCancel() {
        navigate(`/employees/${_id}`);
    }



    return(
        <>
                    <Navbar />
        <div className="addEmployeeContainer">
            <h1>Edit Employee</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                        name="firstName"
                        required
                        value={data.firstName}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write firstName here..." />
                <input type="text"
                        name="lastName"
                        required
                        value={data.lastName}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write lastName here..." />
                <input type="text"
                        name="title"
                        required
                        value={data.title}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write title here..." />
                <input type="email"
                        name="email"
                        required
                        value={data.email}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write email here..." />
                <input type="number"
                        name="salary"
                        value={data.salary}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write salary here..." />
                <input type="tel"
                        name="phone"
                        pattern="(48)-[0-9]{3}-[0-9]{3}-[0-9]{3}"
                        required
                        value={data.phone}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write phonenumber here..." />
                        <small>Format: +48-XXX-XXX-XXX</small>
                <input type="text"
                        name="department"
                        value={data.department}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write department here..." />
                <div className="addEmployeeBtns">
                    <button type="submit" onClick={handleSubmit} className="addBtn">Edit</button>
                    <button type="button" onClick={handleCancel} className="cancelBtn">Cancel</button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}