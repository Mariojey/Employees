import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";

export default function Add(){

    const initState = {
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        salary: 0,
        phone: "",
        department: ""
    };

    const [employee, setEmployee] = useState(initState);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        function postEmployee(){
            try{
                fetch(`http://127.0.0.1:8888/api/employee`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(employee)
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
        setEmployee({ ...employee, [event.target.name]: event.target.value });
    }

    function handleCancel() {
        navigate('/employees');
    }

    return(
        <>
        <Navbar />
        <div className="addEmployeeContainer">
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                        name="firstName"
                        required
                        value={employee.firstName}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write firstName here..." />
                <input type="text"
                        name="lastName"
                        required
                        value={employee.lastName}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write lastName here..." />
                <input type="text"
                        name="title"
                        required
                        value={employee.title}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write title here..." />
                <input type="email"
                        name="email"
                        required
                        value={employee.email}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write email here..." />
                <input type="number"
                        name="salary"
                        value={employee.salary}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write salary here..." />
                <input type="tel"
                        name="phone"
                        pattern="(48)-[0-9]{3}-[0-9]{3}-[0-9]{3}"
                        required
                        value={employee.phone}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write phonenumber here..." />
                        <small>Format: +48-XXX-XXX-XXX</small>
                <input type="text"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        className="formInput"
                        placeholder="Write department here..." />
                <div className="addEmployeeBtns">
                    <button type="submit" onClick={handleSubmit} className="addBtn">Add</button>
                    <button type="button" onClick={handleCancel} className="cancelBtn">Cancel</button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}