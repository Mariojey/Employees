import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Search.css'

export default function Search(){

    const [result , setResult] = useState([])
    const [key, setKey] = useState("")
    useEffect(() => {
        function search(){
        try{
            if(!key.trim()){
                setResult([])
                return
            }
            fetch(`http://127.0.0.1:8888/api/employee/`, 
                {params: {key: key, limit: 5}})
                .then(res => res.json())
                .then((data) => {
                    const results = data.filter((item) => {
                        return (
                          (item.firstName && item.firstName.toLowerCase().includes(key)) || (item.lastName && item.lastName.toLowerCase().includes(key)) 
                        )
                    });
                    setResult(results)
                    console.log(results);
                    //setResult(data)
                })
        }catch(error){
            console.log(error);
        }
    }
    search()
    },[key])

    return(
        <form>
            <div className="searchWrapper">
                <div className="formGroup">
                    <input 
                        type="text" 
                        className="formControl"     
                        placeholder="Searching ... "
                        value={key}  
                        onChange={(event) => setKey(event.target.value) }
                    />
                </div>
                <div className="searchResult">

                    {
                        result && result.map((item) => {
                            return(
                                <Link to={`/employee/${item._id}`} key={item._id} className="link">{item.firstName} {item.lastName}</Link>
                            )
                        })

                    }
                </div>
            </div>
        </form>
    )
}