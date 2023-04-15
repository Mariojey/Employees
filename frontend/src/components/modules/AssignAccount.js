import React, { useEffect, useState } from "react";

import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";


export default function Assign(){
    

    const employeeState = {
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        salary: 0,
        phone: "",
        department: ""
    }

    const [employees, setEmployees] = useState(employeeState)


    function fetchEmployees(){
        try{
            fetch(`http://127.0.0.1:8888/api/employee`, {
                 method: 'GET',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 }
             }).then(res => res.json())
             .then(data => {
                 console.log(data);
                 setEmployees(data)
             })
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        fetchEmployees()
    },[])
  console.log(`Employees data ${employees}`);


    return(
        <>
            { employees && employees.map((item) => {
                return(
                    <option value={item._id} key={item._id}>{item.firstName} {item.lastName}</option>
                )
            })}
        </>
    )

}