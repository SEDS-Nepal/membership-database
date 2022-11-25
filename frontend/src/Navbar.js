import React from 'react'

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
                        <a className="nav-link" href="/">HOME</a>
                    </li>
                    <li className="mx-4 nav-item active">
                        <a className="nav-link" href="/membership">MEMBERSHIP</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar