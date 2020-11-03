import React, { Component } from 'react';
import titleImage from '../images/title_image.jpg'

class Title extends Component {
    render(){
        return(
            <div className="relative flex w-full h-32 items-center justify-center overflow-hidden">
                <h2 className="absolute flex font-serif text-2xl antialiased font-extrabold">System Rezerwacji</h2>
                <img src={titleImage} className="opacity-50"/>
            </div>
        )
    }
}

export default Title;