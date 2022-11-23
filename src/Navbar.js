import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light sticky-top shadow">
        <div class="container">
            <span class="navbar-brand">
                <img src="sedsNepal.png" width="100em" height="100em" class="d-inline-block align-baseline" alt="" />
            </span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <ul class="navbar-nav mr-auto top">
                    <li class="mx-4 nav-item active">
                        <a class="nav-link" href="/">HOME</a>
                    </li>
                    <li class="mx-4 nav-item active">
                        <a class="nav-link" href="/membership">MEMBERSHIP</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar