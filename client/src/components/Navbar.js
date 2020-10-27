import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CSS/Navbar.css';

class Navbar extends Component {
    constructor() {
        super();
        this.hamburgerTrigger = this.hamburgerTrigger.bind(this);
        this.bars = React.createRef();
        this.close = React.createRef();
        this.mobileNavbar = React.createRef();
    }

    componentDidMount(){
        this.close.current.style.display = "none";
    }

    hamburgerTrigger() {
        switch(this.close.current.style.display){
            case "none":
                this.close.current.style.display = "block";
                this.bars.current.style.display = "none";
                this.mobileNavbar.current.classList.add("showNav");
                console.log(this.mobileNavbar.current.classList);
                break;
            
            case "block":
                this.close.current.style.display = "none";
                this.bars.current.style.display = "block";
                this.mobileNavbar.current.classList.remove("showNav");
                break;
        }
    }
    render(){
        return(
            <nav className="navbar">
                <ul className="normalNav">
                    <li><NavLink to='/'>Strona główna</NavLink></li>
                    <li><NavLink to='/tablelist'>Lista stolików</NavLink></li>
                    <li><NavLink to='/reservationlist'>Lista rezerwacji</NavLink></li>
                    <li><NavLink to='/addtable'>Dodaj stolik</NavLink></li>
                    <li><NavLink to='/addreservation'>Dodaj rezerwację</NavLink></li>
                </ul>
                <button className="hamburger" onClick={this.hamburgerTrigger}><i className="fas fa-bars" ref={this.bars}></i><i className="fas fa-times" style={{color: "white"}} ref={this.close}></i></button>
                <section>
                    <ul className="mobileNav" ref={this.mobileNavbar}>
                        <li onClick={this.hamburgerTrigger}><NavLink to='/'>Strona główna</NavLink></li>
                        <li onClick={this.hamburgerTrigger}><NavLink to='/tablelist'>Lista stolików</NavLink></li>
                        <li onClick={this.hamburgerTrigger}><NavLink to='/reservationlist'>Lista rezerwacji</NavLink></li>
                        <li onClick={this.hamburgerTrigger}><NavLink to='/addtable'>Dodaj stolik</NavLink></li>
                        <li onClick={this.hamburgerTrigger}><NavLink to='/addreservation'>Dodaj rezerwację</NavLink></li>
                    </ul>
                </section>
            </nav>
            
        )
    }
}

export default Navbar;