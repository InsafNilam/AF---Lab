import React from 'react';
import './RoleSelector.css';
import Card from './Card';

import Customer from "../Assets/Customer.jpg";
import Trader from "../Assets/Trader.jpg";

export default function RoleSelector() {
    return (
        <section class="text-center">
        {/* <!-- Background image --> */}
        <div class="p-5 bg-image" className='role-bg'></div>
        {/* <!-- Background image --> */}
    
        <div className="row d-flex justify-content-center align-items-center h-100 role">
        <div class="card mx-4 mx-md-5 shadow-5-strong role-content">
            <div class="card-body py-5 px-md-5">
                <div className='card-group-1 admin'>
                    <Card imgURL={Trader} alt='Trader' title='Trader' text={"Markets can remain irrational\nlonger than\nyou can remain solvent"} URLpath={"/login/trader"}/>
                    <Card imgURL={Customer} alt='Customer' title='Customer' text={"Nothing is worse than\nmissing an\nOppurtunity"} URLpath={"/login/customer"}/>
                </div>
            </div>
        </div>
        
        </div>
        </section>
    );
}
