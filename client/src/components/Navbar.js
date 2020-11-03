import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    constructor() {
        super();
        this.hamburgerTrigger = this.hamburgerTrigger.bind(this);
        this.bars = React.createRef();
        this.close = React.createRef();
        this.mobileNavbar = React.createRef();
        this.navbar = React.createRef();
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
                this.navbar.current.classList.add("overlay");
                break;
            
            case "block":
                this.close.current.style.display = "none";
                this.bars.current.style.display = "block";
                this.mobileNavbar.current.classList.remove("showNav");
                this.navbar.current.classList.remove("overlay");
                break;
        }
    }
    render(){
        return(
            <nav className="navbar" ref={this.navbar}>
                <ul className="normalNav">
                    <li><NavLink to='/'>Strona główna</NavLink></li>
                    <li><NavLink to='/tablelist'>Lista stolików</NavLink></li>
                    <li><NavLink to='/reservationlist'>Lista rezerwacji</NavLink></li>
                    <li><NavLink to='/addtable'>Dodaj stolik</NavLink></li>
                    <li><NavLink to='/addreservation'>Dodaj rezerwację</NavLink></li>
                </ul>
                <button className="hamburger" onClick={this.hamburgerTrigger}><i className="fas fa-bars" ref={this.bars}></i><i className="fas fa-times" style={{color: "white"}} ref={this.close}></i></button>
                <section>
                    <ul className="mobileNav justify-center items-center" ref={this.mobileNavbar}>
                        <li className="py-3 flex"><NavLink to='/' onClick={this.hamburgerTrigger}>Strona główna</NavLink></li>
                        <li className="py-3 flex"><NavLink to='/tablelist' onClick={this.hamburgerTrigger}>Lista stolików</NavLink></li>
                        <li className="py-3 flex"><NavLink to='/reservationlist' onClick={this.hamburgerTrigger}>Lista rezerwacji</NavLink></li>
                        <li className="py-3 flex"><NavLink to='/addtable' onClick={this.hamburgerTrigger}>Dodaj stolik</NavLink></li>
                        <li className="py-3 flex"><NavLink to='/addreservation' onClick={this.hamburgerTrigger}>Dodaj rezerwację</NavLink></li>
                    </ul>
                </section>
            </nav>
            
        )
    }
}

export default Navbar;