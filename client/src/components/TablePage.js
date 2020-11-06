import React, {useRef} from 'react';
import {useMutation} from '@apollo/client';
import { addTableMutation } from '../queries'


const AddTable = () => {
    const [addTable] = useMutation(addTableMutation);
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
        message.current.innerHTML = `<p class="font-semibold">Pomyślnie dodano nowy stolik!</p>`
    }
    return(
        <section className="p-8 h-screen flex justify-center items-start">
            <div className="container text-center shadow bgColor py-4 align-middle">
                <form onSubmit={submitTable}>
                    <div className="inputField">
                        <label className="block text-sm font-bold mb-2" htmlFor="tableNumber">Numer stolika: </label>
                        <input type="number" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tableNumber" min="0" step="1" ref={tableNumber} required/>
                    </div>
                    <div className="inputField">
                        <label className="block text-sm font-bold mb-2 mt-4" htmlFor="seatsAmount">Ilość miejsc przy stoliku: </label>
                        <input type="number" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="seatsAmount" min="1" step="1" ref={tableSeats} required/>
                    </div>
                    <div className="inputField">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center mt-4">
                            <i className="fas fa-plus fill-current w-4 h-4 mr-2 text-gray-300"></i>
                            <span>Dodaj stolik</span>
                        </button>
                    </div>
                    <div className="message" ref={message}>
        
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddTable;