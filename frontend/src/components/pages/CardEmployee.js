import React, { useEffect } from "react";

import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";

import { useParams } from "react-router-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Card.css"

export default function Card(){

    const initState = {
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        salary: 0,
        phone: "",
        department: ""
    };

    const navigation = useNavigate()

    const {_id} = useParams()

    const [data, setData] = useState(initState)

    useEffect(() => {
        fetch(`http://127.0.0.1:8888/api/employee/${_id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            setData(data)
        })
    },[])

    function changeURL() {
        navigation(`/employee/${_id}/edit`)
    }

    return(
        <>
            <Navbar />

            <div className="cardContainer">
                <div className="card">
                    <h1>{data.firstName} {data.lastName}</h1>
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                    <p>{data.salary}</p>
                    <p>{data.title}</p>
                    <p>{data.department}</p> 
                    <button type="button" onClick={changeURL} className="btn">Edit</button>              
                </div>
            </div>
            
            <Footer />
        </>
    )
}