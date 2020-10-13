import React, { useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { addReservationMutation, getReservationsQuery, getTablesQuery } from '../queries'

const AddReservation = () => {
    //Hooks for query and mutations
    const [addReservation, { data }] = useMutation(addReservationMutation);
    const {data: dataT, error: errorT, loading: loadingT} = useQuery(getTablesQuery);
    const {data: dataR, error: errorR, loading: loadingR} = useQuery(getReservationsQuery);

    //use reference hooks
    const selectedDate = useRef(null);
    const selectedTime = useRef(null);
    const peopleNumber = useRef(null);
    const insertDiv = useRef(null);

    //componentDidMount and componentDidUpdate hook
    useEffect(() => {
        const date = new Date();
        const minDate = date.toISOString().slice(0,10);
        selectedDate.current.min = minDate;
    })

    const checkTables = () => {
        if(selectedDate.current.validity.valid !== true){
            alert("Pole z datą jest puste lub podana data jest niepoprawna");
        }
        else if(selectedTime.current.validity.valid !== true){
            alert("Pole z godziną nie może być puste oraz godzina musi się mieścić w przedziale od 08:00 do 21:00");
        }
        else if(peopleNumber.current.validity.valid !== true){
            alert("Ilość osób w rezerwacji musi wynosić conajmniej 1");
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

            const tablesArray = dataT.tables.filter(tableID => !tablesIDArray.includes(tableID.id)); //Avalible tables array

            const peopleCheck = (seats) => {
                if(seats === 1){
                    return "Gościa";
                } else {
                    return "Gości";
                }
            }

            insertDiv.current.children[0].children[1].innerHTML = '' //Reset options for select
            for(let i = 0; i < tablesArray.length; i++){
                insertDiv.current.children[0].children[1].innerHTML += `
                <option key={${tablesArray[i].id}} value={${tablesArray[i].id}}>Stolik numer ${tablesArray[i].number} dla ${tablesArray[i].seats} ${peopleCheck(tablesArray[i].seats)}</option>
                `
            }

            insertDiv.current.hidden = false;
        }
    }

    const submitReservation = () => {
        console.log("hello");
    }

    return(
        <section className="wrapper">
            <form onSubmit={submitReservation}>
                <div className="inputField">
                    <label htmlFor="dateSelection">Data rezerwacji: </label>
                    <input type="date" id="dateSelection" required ref={selectedDate}/>
                </div>
                <div className="inputField">
                    <label htmlFor="reservationTime">Godzina rezerwacji: </label>
                    <input type="time" id="reservationTime" min="08:00:00" max="21:00:00" required ref={selectedTime}/>
                </div>
                <div className="inputField">
                    <label htmlFor="numberOfPeople">Ilość osób: </label>
                    <input type="number" min="1" step="1" id="numberOfPeople" required ref={peopleNumber}/>
                </div>
                <button id="buttonCheck" type="button" onClick={checkTables}>Sprawdź dostępne stoliki</button>
                <div className="insert" ref={insertDiv} hidden>
                    <div className="inputField">
                        <label>Wybierz dostępny stolik: </label>
                        <select>

                        </select>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default AddReservation;