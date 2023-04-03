import React, { useEffect, useState } from "react";
import {GenIcon} from "react-icons";

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
                    console.log(data)
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
                <button className="searchBtn"><GenIcon /></button>
            </div>
        </form>
    )
}