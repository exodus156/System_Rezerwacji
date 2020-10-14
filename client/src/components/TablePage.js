import React, {useRef} from 'react';
import {useMutation} from '@apollo/client';
import { addTableMutation } from '../queries'


const AddTable = () => {
    const [addTable, { data }] = useMutation(addTableMutation);
    const tableNumber = useRef(null);
    const tableSeats = useRef(null);
    const message = useRef(null);
    
    
    const submitTable = (e) => {
        e.preventDefault();
        const tableReserved = false;

        addTable({ variables: {
            number: tableNumber.current.valueAsNumber,
            seats: tableSeats.current.valueAsNumber,
            reserved: tableReserved
        }});

        //Reset form fields
        tableNumber.current.value = "";
        tableSeats.current.value = "";

        //Add message
        message.current.innerHTML = `<p>Pomyślnie dodano nową rezerwację!</p>`
    }
    return(
        <section className="wrapper">
            <form onSubmit={submitTable}>
                <div className="inputField">
                    <label htmlFor="tableNumber">Numer stolika: </label>
                    <input type="number" id="tableNumber" min="0" step="1" ref={tableNumber} required/>
                </div>
                <div className="inputField">
                    <label htmlFor="seatsAmount">Ilość miejsc przy stoliku: </label>
                    <input type="number" id="seatsAmount" min="1" step="1" ref={tableSeats} required/>
                </div>
                <div className="inputField">
                    <input type="submit" value="Dodaj stolik"/>
                </div>
                <div className="message" ref={message}>

                </div>
            </form>
        </section>
    )
}

export default AddTable;