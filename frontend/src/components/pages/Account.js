import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Account() {
    
    const initState = {
        email: "",
        employee_id: "",
        role: ""
    };

    const userInitState = {
        firstName: "Konto",
        lastName: "Użytkownika",
        title: "",
        email: "",
        salary: 0,
        phone: "",
        department: ""
    };

    const navigate = useNavigate()

    const {_id} = useParams()

    const [accountData, setAccountData] = useState(initState)
    const [employeeData, setEmployeeData] = useState(userInitState)

    useEffect(() => {
        function fetchAccountData(){
            fetch(`http://127.0.0.1:8888/api/user/${_id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                setAccountData(data)
            })
        }
        function fetchEmployeeData() {
            fetch(`http://127.0.0.1:8888/api/employee/${accountData.employee_id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                setEmployeeData(data)
            })
        }
        fetchAccountData()
        fetchEmployeeData()
    },[])

    return(
        <>
            <div className="card">
                <h1>{employeeData.firstName}{employeeData.lastName}</h1>
                <p>{accountData.email}</p>
                <p>{accountData.role}</p>
            </div>
        </>
    )

}