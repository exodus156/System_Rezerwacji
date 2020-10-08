import React, { Component, useState } from 'react';

const initState = {
    number: null,
    seats: null,
    action: 'ADD_TABLE'
}
class AddTable extends Component {
    render(){
        const [Table, setTable] = useState(initState);
        const submitTable = (e) => {
            e.preventDefault();
            
            console.log(Table);
            console.log(setTable);
        }

        return(
            <section className="wrapper">
                <form onSubmit={submitTable}>
                    <div className="inputField">
                        <label htmlFor="nrStolika">Numer stolika:</label>
                        <input type="number" id="nrStolika" min="0" step="1"/>
                    </div>
                    <div className="inputField">
                        <label htmlFor="iloscMiejsc">Ilość miejsc przy stoliku:</label>
                        <input type="number" id="iloscMiejsc" min="1" step="1"/>
                    </div>
                    <div className="inputField">
                        <input type="submit" value="Dodaj stolik"/>
                    </div>
                </form>
            </section>
        )
    }
}

export default AddTable;