import React, { useEffect, useState } from "react";

import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function Assign(){
    
    const initState = {
        email: "",
        password: "",
        employee_id: "",
        role: ""
    };

    const employeeState = {
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        salary: 0,
        phone: "",
        department: ""
    }
    const {_id} = useParams()

    const [user, setUser] = useState(initState)
    const [employees, setEmployees] = useState(employeeState)

    const navigate = useNavigate()

    useEffect(() => {
        function fetchUser(){
            fetch(`http://127.0.0.1:8888/api/user/${_id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                setUser(data)
            })
        }
        function fetchEmployees(){
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
        fetchUser()
        fetchEmployees()
    },[])

    function handleSubmit(event){
        event.preventDefault();

        function postAccount(){
            try{
                fetch(`http://127.0.0.1:8888/api/user/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }).then(res => res.json())
                .then(res => {
                    navigate(`/account/${res._id}`);
                })
            }catch(error){
                console.log(`Ups! Something went wrong 🥺`, error);
            }
        }
        postAccount()
    }

    function handleChange(event) {
        setUser({...user, [event.target.name]: event.target.value});
    }

    function handleCancel() {
        navigate(`/account/${_id}`);
    }


    return(
        <>
            <Navbar />

            <div className="addEmployeeContainer">
            <h1>Edit Employee</h1>
            <form onSubmit={handleSubmit} className="addEmployeeContainerForm">
                <input type="text"
                        name="firstName"
                        required
                        value={user.email}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write firstName here..." />
                    <select name="role" id="role" onChange={handleChange}>

                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>

                    </select>
                    <select name="employee_id" id="employee_id" onChange={handleChange}>
                        { employees && employees.map(item => {
                            return(
                                <option value={item._id}>{item.firstName} {item.lastName}</option>
                            )
                        })}
                    </select>
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