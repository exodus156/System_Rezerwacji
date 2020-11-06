import React, { Component } from 'react';

class Title extends Component {
    render(){
        return(
            <div className="relative flex w-full h-32 items-center justify-center overflow-hidden bg-gray-100 bg-opacity-75">
                <h2 className="absolute flex font-serif text-2xl antialiased font-extrabold tracking-widest">System Rezerwacji</h2>
            </div>
        )
    }
}

export default Title;