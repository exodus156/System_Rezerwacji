import React, {useRef} from 'react';
import {useMutation} from '@apollo/client';
import { addTableMutation } from '../queries'


const AddTable = () => {
    const [addTable, { data }] = useMutation(addTableMutation);
    const tableNumber = useRef(null);
    const tableSeats = useRef(null);
    
    
    const submitTable = (e) => {
        e.preventDefault();
        const tableReserved = false;

        addTable({ variables: {
            number: tableNumber.current.valueAsNumber,
            seats: tableSeats.current.valueAsNumber,
            reserved: tableReserved
        }});

        console.log(tableNumber.current.valueAsNumber);
        console.log(tableSeats.current.valueAsNumber);
    }
    return(
        <section className="wrapper">
            <form onSubmit={submitTable}>
                <div className="inputField">
                    <label htmlFor="nrStolika">Numer stolika:</label>
                    <input type="number" id="nrStolika" min="0" step="1" ref={tableNumber}/>
                </div>
                <div className="inputField">
                    <label htmlFor="iloscMiejsc">Ilość miejsc przy stoliku:</label>
                    <input type="number" id="iloscMiejsc" min="1" step="1" ref={tableSeats}/>
                </div>
                <div className="inputField">
                    <input type="submit" value="Dodaj stolik"/>
                </div>
            </form>
        </section>
    )
}

export default AddTable;