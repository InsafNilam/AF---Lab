import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import axios from 'axios';

export default function Item() {
    const role = sessionStorage.getItem("role");

    let count = 0;
    const [itemValues,setItemValues]= useState([]);
    const [values,setValues]=useState({
        name:'',
        price:'',
        promotion: ''
    });

    const handleChange=(event)=>{
        setValues({...values,
            [event.target.name]:event.target.value,
        })
    }
    const handleSubmit= (event)=>{
        event.preventDefault();
        
        // Make Sure there is no spaces trailing and leading
        Object.keys(values).map(k=>values[k]=values[k].trim());
        if(values.name!=='' && values.price!=='' && values.promotion !==''){
            axios.post('http://localhost:5000/additem',values).then(res=>{
                setItemValues(res.data);
            })
        }
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/getitem').then(res=>{
            setItemValues(res.data);
        })
    },[])

    if(role === 'trader'){
    return (
    <>
        <Navbar/>
        <br/>
        <h3 className='text-center'>Add Product</h3>
        <br/>
        <form className="d-flex justify-content-center">
            {/* <!-- 3 column grid layout with text inputs for the first and last names --> */}
            <div class="row">
            <div class="col-md mb-4">
                <div class="form-outline">
                <input type="text" id="form3Example1" class="form-control" value={values.name} name='name' onChange={handleChange}/>
                <label class="form-label" for="form3Example1">Name</label>
                </div>
            </div>
            <div class="col-md mb-4">
                <div class="form-outline">
                <input type="text" id="form3Example2" class="form-control" value={values.price} name='price' onChange={handleChange}/>
                <label class="form-label" for="form3Example2">Price</label>
                </div>
            </div>
            <div class="col-md mb-4">
                <div class="form-outline">
                <input type="text" id="form3Example2" class="form-control" value={values.promotion} name='promotion' onChange={handleChange}/>
                <label class="form-label" for="form3Example2">Promotion</label>
                </div>
            </div>
            </div>
            <button type="button" className="btn btn-success btn-rounded" onClick={handleSubmit}>Add</button>
            </form>
        <h3 className='text-center'>Product Details</h3>
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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    itemValues ? itemValues.map(itemValues=> (
                        <tr key={++count}>
                            <td>{count}</td>
                            <td>{itemValues.name}</td>
                            <td>{itemValues.price}</td>
                            <td>{itemValues.promotion}</td>
                            <td>
                                <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
                                    setValues(itemValues);
                                }
                                }>Edit</button>
                            </td>
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
}else{
    return (
    <>
        <Navbar/>
        <br/>
        <h3 className='text-center'>Product Details</h3>
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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    itemValues ? itemValues.map(itemValues=> (
                        <tr key={++count}>
                            <td>{count}</td>
                            <td>{itemValues.name}</td>
                            <td>{itemValues.price}</td>
                            <td>{itemValues.promotion}</td>
                            <td>
                                <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
                                    axios.post('http://localhost:5000/cartinfo',itemValues).then(res=>{})
                                }}>Cart</button>
                                <button type="button" class="btn btn-link btn-sm btn-rounded"onClick={()=>{
                                    axios.post('http://localhost:5000/wishinfo',itemValues).then(res=>{})
                                }}>Wish</button>
                            </td>
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
}
