import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar">
                <ul>
                    <li><NavLink to='/'>Strona główna</NavLink></li>
                    <li><NavLink to='/addtable'>Dodaj stolik</NavLink></li>
                    <li><NavLink to='/addreservation'>Dodaj rezerwację</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;