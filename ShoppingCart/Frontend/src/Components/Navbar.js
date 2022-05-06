import React from 'react'

export default function Navbar() {
    const role = sessionStorage.getItem("role");
    const handleLogout=()=>{
        sessionStorage.clear();
        setInterval(()=> window.location.pathname = "/",1000);
    }

    if(role === 'trader'){
    return (
    //   <!-- Navbar -->
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
        <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
        </button>
        <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
                <a className="nav-link" aria-current="page" href="/home">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/item">Item</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/customer">Customer</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
            </li>
            </ul>
            <button type="button" className="btn btn-info btn-rounded" onClick={handleLogout}>Logout</button>
        </div>
        </div>
    </nav>
    );
}else{
    return(
//   <!-- Navbar -->
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
        <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
        </button>
        <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
                <a className="nav-link" aria-current="page" href="/home">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/item">Item</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/cart">Cart</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/wishlist">Wishlist</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/aboutus">About Us</a>
            </li>
            </ul>
            <button type="button" className="btn btn-info btn-rounded" onClick={handleLogout}>Logout</button>
        </div>
        </div>
    </nav>
    );
}
}
