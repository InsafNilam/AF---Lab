import React, {useState,useRef, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Login.css';
import login from '../Assets/Login.jpg';
import {LoginValidate, SignUpValidate} from './Validate';

export default function Login() {
    const params = useParams();
    const [signInValues,setSignInValues]=useState({
        email:'',
        password:'',
        role: params.role
    });

    const [signUpValues,setSignUpValues]=useState({
        email:'',
        username:'',
        password:'',
        userconfirmpass:'',
        role: params.role
    });

    // Used to refer input fields
    const signInEmail=useRef();
    const signInPassword=useRef();

    const signUpEmail=useRef();
    const signUpPassword=useRef();
    const signUpConfirmPassword=useRef();
    const signUpUserName=useRef();
    

    const handleSignInChange=(event)=>{
        setSignInValues({...signInValues,
            [event.target.name]:event.target.value,
        })
    }
    const handleSignUpChange=(event)=>{
        setSignUpValues({...signUpValues,
            [event.target.name]:event.target.value,
        })
    }

    const [signInErrors,setSignInErrors]=useState({});
    const [signUpErrors,setSignUpErrors]=useState({});

    const handleSignInSubmit= (event)=>{
        event.preventDefault();
        
        // Make Sure there is no spaces trailing and leading
        Object.keys(signInValues).map(k=>signInValues[k]=signInValues[k].trim());
        // Validate input Fields
        setSignInErrors(LoginValidate(signInValues));
    }

    const handleSignUpSubmit= (event)=>{
        event.preventDefault();
        
        // Make Sure there is no spaces trailing and leading
        Object.keys(signUpValues).map(k=>signUpValues[k]=signUpValues[k].trim());
        // Validate input Fields
        setSignUpErrors(SignUpValidate(signUpValues));
    }

    useEffect(()=>{
        // sessionStorage.setItem('isAuth',"true");
        if(Object.keys(signInErrors).length===0  && signInValues.email!=='' && signInValues.password!==''){
            axios.post('http://localhost:5000/userinfo',signInValues).then(res=>{
                        if(res.data.status !== -1){
                            sessionStorage.setItem('isAuth',"true");
                            sessionStorage.setItem('role',res.data.data.role);
                            sessionStorage.setItem('email',res.data.data.email);
                            setInterval(()=> window.location.pathname = "/home",1000);
                        }
                    });
        }else if(Object.keys(signUpErrors).length===0  && signUpValues.email!=='' && signUpValues.password!=='' && signUpValues.userconfirmpass !== '' && signUpValues.username !== ''){
            axios.post('http://localhost:5000/addinfo',signUpValues).then(res=>{
                        if(res.data.status !== -1){
                            sessionStorage.setItem('isAuth',"true");
                            sessionStorage.setItem('role',res.data.data.role);
                            sessionStorage.setItem('email',res.data.data.email);
                            setInterval(()=> window.location.pathname = "/home",1000);
                        }
                    });
        }else{
            console.log(params.role)
        }
    },[signUpErrors, signInErrors])

    return (
        <section className="h-100 gradient-form" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                {/* Left Panel */}
                                <div className="col-lg-6 left-panel">
                                    <div className="card-body p-md-5 mx-md-4">
                                        {/* <!-- Pills navs --> */}
                                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                                                aria-controls="pills-login" aria-selected="true">Login</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                                                aria-controls="pills-register" aria-selected="false">Register</a>
                                            </li>
                                        </ul>
                                        {/* <!-- Pills navs --> */}
                                        <div className="text-center">
                                            <img src={login} alt="logo" className='login-logo'/>
                                            <h4 className="mt-1 mb-5 pb-1">Welcome to <b>SWEET SPOT</b></h4>
                                        </div>
                                        {/* <!-- Pills content --> */}
                                        <div className="tab-content">
                                        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                                            <form>
                                            {/* <!-- Email input --> */}
                                            <div className="form-outline mb-4">
                                                <input type="email" ref={signInEmail} id="useremail" value={signInValues.email} className="form-control" name='email' onChange={handleSignInChange}/>
                                                <label className="form-label" htmlFor="useremail">Email or Username</label>
                                            </div>
                                            {signInErrors.email && <p className='error'>{signInErrors.email}</p>}
                                            {/* <!-- Password input --> */}
                                            <div className="form-outline mb-4">
                                                <input type="password" ref={signInPassword} id="loginPassword" value={signInValues.password} name='password' className="form-control" onChange={handleSignInChange}/>
                                                <label className="form-label" htmlFor="loginPassword">Password</label>
                                            </div>
                                            {signInErrors.password && <p className='error'>{signInErrors.password}</p>}
                                            {/* <!-- 2 column grid layout --> */}
                                            <div className="row mb-4">
                                                <div className="col-md-6 d-flex justify-content-center">
                                                {/* <!-- Checkbox --> */}
                                                <div className="form-check mb-3 mb-md-0">
                                                    <input className="form-check-input" type="checkbox" value="" id="loginCheck"/>
                                                    <label className="form-check-label" htmlFor="loginCheck">Remember me </label>
                                                </div>
                                                </div>

                                                <div className="col-md-6 d-flex justify-content-center">
                                                {/* <!-- Simple link --> */}
                                                <a href="#!">Forgot password?</a>
                                                </div>
                                            </div>

                                            {/* <!-- Submit button --> */}
                                            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSignInSubmit}>Sign in</button>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                                            <form>
                                            {/*  Username input */}
                                            <div className="form-outline mb-4">
                                                <input type="text" id="registerUsername" ref={signUpUserName} name='username' value={signUpValues.username} className="form-control" onChange={handleSignUpChange}/>
                                                <label className="form-label" htmlFor="registerUsername">Username</label>
                                            </div>
                                            {signUpErrors.username && <p className='error'>{signUpErrors.username}</p>}
                                            {/* Email input */}
                                            <div className="form-outline mb-4">
                                                <input type="email" id="registerEmail" ref={signUpEmail} name='email' value={signUpValues.email} className="form-control" onChange={handleSignUpChange}/>
                                                <label className="form-label" htmlFor="registerEmail">Email</label>
                                            </div>
                                            {signUpErrors.email && <p className='error'>{signUpErrors.email}</p>}
                                            {/* Password input */}
                                            <div className="form-outline mb-4">
                                                <input type="password" id="registerPassword" ref={signUpPassword} name='password' value={signUpValues.password} className="form-control" onChange={handleSignUpChange}/>
                                                <label className="form-label" htmlFor="registerPassword">Password</label>
                                            </div>
                                            {signUpErrors.password && <p className='error'>{signUpErrors.password}</p>}
                                            {/* Confirm Password input */}
                                            <div className="form-outline mb-4">
                                                <input type="password" id="registerRepeatPassword" ref={signUpConfirmPassword} name='userconfirmpass' value={signUpValues.userconfirmpass} className="form-control" onChange={handleSignUpChange}/>
                                                <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                                            </div>
                                            {signUpErrors.userconfirmpass && <p className='error'>{signUpErrors.userconfirmpass}</p>}
                                            {/* Checkbox */}
                                            <div className="form-check d-flex justify-content-center mb-4">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                                                aria-describedby="registerCheckHelpText" />
                                                <label className="form-check-label" htmlFor="registerCheck">
                                                I have read and agree to the terms
                                                </label>
                                            </div>

                                            {/* <!-- Submit button --> */}
                                            <button type="submit" className="btn btn-primary btn-block mb-3" onClick={handleSignUpSubmit}>Sign up</button>
                                            </form>
                                        </div>
                                        </div>
                                        {/* <!-- Pills content --> */}
                                    </div>
                                </div>
                                {/* Right Panel */}
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Buying something on sale is a very special feeling. In fact, the less I pay for something, the more it is worth to me. I have a dress that I paid so little for that I am afraid to wear it. I could spill something on it, and then how would I replace it for that amount of money?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
