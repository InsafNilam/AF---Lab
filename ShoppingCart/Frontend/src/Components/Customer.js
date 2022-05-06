import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import './Customer.css'

export default function Customer() {
    let count = 0;
    const [values,setValues]= useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/')
            .then(res=>{
                setValues(res.data)
            });
    },[]);
    return (
        <>
        <Navbar/>
        <div className="row d-flex justify-content-center h-100">
        <div className="card align-items-center shadow-5-strong w-50 customer">
            <table class="table align-middle mb-0 bg-white">
            <thead class="bg-light">
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    values ? values.map(values=> (
                        <tr>
                            <td>{++count}</td>
                            <td>{values.username}</td>
                            <td>{values.email}</td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        </div>
        </>
    )
}
