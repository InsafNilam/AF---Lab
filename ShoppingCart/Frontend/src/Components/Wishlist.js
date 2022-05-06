import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import axios from 'axios';

export default function Cart() {
    let count=0;
    const [values,setValues]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/viewwishinfo').then(res=>{
            setValues(res.data);
        })
    },[])
    return (
    <>
        <Navbar/>
        <br/>
        <h3 className='text-center'>Wish Details</h3>
        <br/>
        <div className="row d-flex justify-content-center h-100">
        <div className="card align-items-center shadow-5-strong w-50 customer">
            <table class="table align-middle mb-0 bg-white">
            <thead class="bg-light">
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Discount(%)</th>
                </tr>
            </thead>
            <tbody>
                {
                    values ? values.map(values=> (
                        <tr key={++count}>
                            <td>{count}</td>
                            <td>{values.name}</td>
                            <td>{values.price}</td>
                            <td>{values.promotion}</td>
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
