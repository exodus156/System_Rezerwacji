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
        message.current.innerHTML = `<p>Pomyślnie dodano nową rezerwację!</p>`
    }
    return(
        <section className="container px-8">
            <form onSubmit={submitReservation}>
                <div className="inputField">
                    <label htmlFor="dateSelection">Data rezerwacji: </label>
                    <input type="date" id="dateSelection" required ref={selectedDate}/>
                    <span></span>
                </div>
                <div className="inputField">
                    <label htmlFor="reservationTime">Godzina rezerwacji: </label>
                    <input type="time" id="reservationTime" min="08:00:00" max="21:00:00" required ref={selectedTime}/>
                    <span></span>
                </div>
                <div className="inputField">
                    <label htmlFor="numberOfPeople">Ilość osób: </label>
                    <input type="number" min="1" step="1" id="numberOfPeople" required ref={peopleNumber}/>
                    <span></span>
                </div>
                <button id="buttonCheck" type="button" onClick={checkTables}>Sprawdź dostępne stoliki</button>
                <div className="insert" ref={insertDiv} hidden>
                    <div className="inputField">
                        <label>Wybierz dostępny stolik: </label>
                        <select required>

                        </select>
                    </div>
                    <div className="inputField">
                        <input type="submit" value="Prześlij rezerwację"/>
                    </div>
                </div>
                <div className="message" ref={message}>

                </div>
            </form>
        </section>
    )
}

export default AddReservation;