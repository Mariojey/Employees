import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

export default function Navbar(){
    return(
        <nav className="nav">
            <div className="navContainer">
                
                <div className="navLogo">Employees</div>
                <ul className="navList">
                    <li className="navItem">
                        <NavLink className="navLink"
                                to="/home">
                                    Find
                        </NavLink>
                    </li>
                    <li className="navItem">
                        <NavLink className="navLink"
                                to="/employees">
                                    All Employees
                        </NavLink>
                    </li>
                    <li className="navItem">
                        <NavLink className="navLink"
                                to="/employees/new">
                                    Create Employee
                        </NavLink>
                    </li>
                    <li className="navItem">
                    <NavLink className="navLink"
                                to="/account">
                                    Accounts
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}