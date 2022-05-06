import React from 'react';
import {Link} from 'react-router-dom';
import './Card.css';

export default function Appointment(props){
    return(
        <div className='_card'>
            <div className='overflow'>
                <img src={props.imgURL} alt={props.alt}/>
            </div>
            <div className='card_body'>
                <div className='card_title'>
                    <h4>{props.title}</h4>
                </div>
                <div className='card_text'> 
                    <p>{props.text}</p>
                </div>
                <div className='_btn'>
                    <Link to={props.URLpath}>
                        <button>Go</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}