import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light sticky-top shadow">
            <div className="container">
                <span className="navbar-brand">
                    <img src="sedsNepal.png" width="100em" height="100em" className="d-inline-block align-baseline" alt="" />
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <ul className="navbar-nav mr-auto top">
                        <li className="mx-4 nav-item active">
                            <Link className="nav-link" to="/">HOME</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Join Us
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/membership">Join as individual</Link></li>
                                <li><Link className="dropdown-item" to="/non-student">Non-student click here </Link></li>
                                <li><Link className="dropdown-item" to="/club">Join as a club</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar