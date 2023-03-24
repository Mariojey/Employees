import React from "react";
import { NavLink } from "react-router-dom";
import '../../App.css'

export default function Navbar(){
    return(
        <nav className="nav">
            <div className="navContainer">
                <NavLink className="navBrand" hrefLang="https://mariojey.github.io/React_Portfolio/" to="https://mariojey.github.io/React_Portfolio/">MarioJey</NavLink>
                <div className="navLogo">Employees</div>
                <ul className="navList">
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
                </ul>
            </div>
        </nav>
    )
}