import React, { useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { addReservationMutation, getReservationsQuery, getTablesQuery } from '../queries'

const AddReservation = () => {
    //Hooks for query and mutations
    const [addReservation] = useMutation(addReservationMutation);
    const {data: dataT} = useQuery(getTablesQuery);
    const {data: dataR} = useQuery(getReservationsQuery);

    //use reference hooks
    const selectedDate = useRef(null);
    const selectedTime = useRef(null);
    const peopleNumber = useRef(null);
    const insertDiv = useRef(null);
    const message = useRef(null);

    //componentDidMount and componentDidUpdate hook
    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const minDate = date.toISOString().slice(0, 10);
        selectedDate.current.min = minDate;
    }, [])

    const checkTables = () => {
        //Reset messages
        selectedDate.current.nextElementSibling.innerText = '';
        selectedTime.current.nextElementSibling.innerText = '';
        peopleNumber.current.nextElementSibling.innerText = '';

        if(selectedDate.current.validity.valid !== true){
            selectedDate.current.nextElementSibling.innerText = "Pole z datą jest puste lub podana data jest niepoprawna";
        }
        else if(selectedTime.current.validity.valid !== true){
            selectedTime.current.nextElementSibling.innerText = "Pole z godziną nie może być puste oraz godzina musi się mieścić w przedziale od 08:00 do 21:00";
        }
        else if(peopleNumber.current.validity.valid !== true){
            peopleNumber.current.nextElementSibling.innerText = "Ilość osób w rezerwacji musi wynosić conajmniej 1";
        }
        else{
            const timeStartString = selectedTime.current.value.replace(':', '');
            const timeStartInt = parseInt(timeStartString); //Converts time from string to int

            const reservationArray = dataR.reservations
                .filter(today => today.date === selectedDate.current.value)
                .filter(timeMin => timeStartInt >= timeMin.timeStart)
                .filter(timeMax => timeStartInt < timeMax.timeEnd)

            const tablesIDArray = [];
            for(let i=0; i < reservationArray.length; i++){
                let id = reservationArray[i].table.id;
                tablesIDArray.push(id);
            }

            const tablesArray = dataT.tables
                .filter(tableID => !tablesIDArray.includes(tableID.id))
                .filter(tableSeats => tableSeats.seats >= peopleNumber.current.valueAsNumber); //Avalible tables array
            const sortedArray = tablesArray.sort((a, b) => {return a.number - b.number}); //Sorted array based on number of the table

            const peopleCheck = (seats) => {
                if(seats === 1){
                    return "Gościa";
                } else {
                    return "Gości";
                }
            }

            if(sortedArray.length === 0){
                alert("Brak dostępnych stolików w w podanym przez Państwa terminie")
            } else{
                    insertDiv.current.children[0].children[1].innerHTML = '' //Reset options for select
                for(let i = 0; i < sortedArray.length; i++){
                    insertDiv.current.children[0].children[1].innerHTML += `
                    <option key={${sortedArray[i].id}} value={${sortedArray[i].id}}>Stolik numer ${sortedArray[i].number} dla ${sortedArray[i].seats} ${peopleCheck(sortedArray[i].seats)}</option>
                    `
                }

                insertDiv.current.hidden = false;
            }
        }
    }

    const submitReservation = (e) => {
        e.preventDefault();

        const tableID = insertDiv.current.children[0].children[1].value.slice(1, insertDiv.current.children[0].children[1].value.length - 1);
        const date = selectedDate.current.value;

        const timeStartString = selectedTime.current.value.replace(':', '');
        const timeStartInt = parseInt(timeStartString); //Converts time from string to int
        const timeEndInt = timeStartInt + 100;
        const people = peopleNumber.current.valueAsNumber;

        const reservationNumber = () => {
            if(dataR.reservations.length === 0){
                return 1;
            } else {
                return dataR.reservations[dataR.reservations.length - 1].number + 1;
            }
        }

        const number = reservationNumber();

        addReservation({variables: {
            number,
            date,
            timeStart: timeStartInt,
            timeEnd: timeEndInt,
            people,
            tableId: tableID
        }})

        //Reset input fields
        selectedDate.current.value = "";
        selectedTime.current.value = "";
        peopleNumber.current.value = "";
        insertDiv.current.hidden = true;
        insertDiv.current.children[0].children[1].innerHTML = ''

        //Add message
        message.current.innerHTML = `<p class="font-semibold">Pomyślnie dodano nową rezerwację!</p>`
    }
    return(
        <section className="p-8 h-screen flex justify-center items-start">
            <div className="container text-center shadow bgColor py-4 align-middle">
                <form onSubmit={submitReservation}>
                    <div className="inputField">
                        <label className="block text-sm font-bold mb-2" htmlFor="dateSelection">Data rezerwacji: </label>
                        <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" id="dateSelection" required ref={selectedDate}/>
                        <p className="font-semibold mt-4 px-4"></p>
                    </div>
                    <div className="inputField">
                        <label className="block text-sm font-bold mb-2 mt-4" htmlFor="reservationTime">Godzina rezerwacji: </label>
                        <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="time" id="reservationTime" min="08:00:00" max="21:00:00" required ref={selectedTime}/>
                        <p className="font-semibold mt-4 px-4"></p>
                    </div>
                    <div className="inputField">
                        <label className="block text-sm font-bold mb-2 mt-4" htmlFor="numberOfPeople">Ilość osób: </label>
                        <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" min="1" step="1" id="numberOfPeople" required ref={peopleNumber}/>
                        <p className="font-semibold mt-4 px-4"></p>
                    </div>
                    <button id="buttonCheck" className="bg-green-600 hover:bg-green-700 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center mt-4" type="button" onClick={checkTables}>
                        <i className="fas fa-search fill-current w-4 h-4 mr-2 text-gray-300"></i>
                        <span>Sprawdź dostępne stoliki</span>
                    </button>
                    <div className="insert" ref={insertDiv} hidden>
                        <div className="inputField relative">
                            <label className="block text-sm font-bold mb-2 mt-4">Wybierz dostępny stolik: </label>
                            <select className="bg-gray-200 border border-gray-200 text-gray-700 pl-2 py-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
        
                            </select>
                        </div>
                        <div className="inputField">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center mt-4">
                                <i className="fas fa-plus fill-current w-4 h-4 mr-2 text-gray-300"></i>
                                <span>Prześlij rezerwację</span>
                            </button>
                        </div>
                    </div>
                    <div className="message" ref={message}>
        
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddReservation;