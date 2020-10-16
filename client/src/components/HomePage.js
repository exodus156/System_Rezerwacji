import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import { getReservationsQuery, getTablesQuery} from '../queries';


const Home = () => {
    const displayList = useRef(null);
    const {data: dataT, error: errorT, loading: loadingT} = useQuery(getTablesQuery);
    const {data: dataR, error: errorR, loading: loadingR} = useQuery(getReservationsQuery);

    const displayTables = () => {
        const tables = dataT.tables;
        const sortedTables = tables.slice().sort((a, b) => {return a.number - b.number}); //.slice() to unfreeze locked array, so .sort can work on it

        displayList.current.innerHTML = ''
        for(let i = 0; i < sortedTables.length; i++){
            displayList.current.innerHTML += `<li key=${sortedTables[i].id}><a href='/table/${sortedTables[i].id}'>Stolik numer ${sortedTables[i].number}</a></li>`
        }
    }

    const displayReservations = () => {
        const reservations = dataR.reservations;
        const sortedReservations = reservations.slice().sort((a, b) => {return a.number - b.number}); //.slice() to unfreeze locked array, so .sort can work on it

        displayList.current.innerHTML = ''
        for(let i = 0; i < sortedReservations.length; i++){
            displayList.current.innerHTML += `<li key=${sortedReservations[i].id}><a href='/reservation/${sortedReservations[i].id}'>Rezerwacja numer ${sortedReservations[i].number}</a></li>`
        }
    }
    return(
        <section className="wrapper">
            <div className="description">
                <p>Text here</p>
            </div>
            <div className="list">
                <button type="button" onClick={displayTables}>Lista stolików</button>
                <button type="button" onClick={displayReservations}>Lista rezerwacji</button>
                <ul ref={displayList}>

                </ul>
            </div>
        </section>
    )
}

export default Home;