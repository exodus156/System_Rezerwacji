import React from 'react';
import { useQuery } from '@apollo/client';
import { getReservationsQuery } from '../queries';
import { Link } from 'react-router-dom';

const ReservationList = () => {
    const {data, error, loading, refetch} = useQuery(getReservationsQuery);
    
    const displayReservations = () => {
        if(loading){
            return <li>Wczytywanie rezerwacji...</li>
        }
        else if(error){
            console.log(error);
            return <li>Błąd wczytywania, sprawdź konsolę</li>
        }
        else{
            const reservations = data.reservations;
            if(reservations.length !== 0){
                const sortedReservations = reservations.slice().sort((a, b) => {return a.number - b.number}); //.slice() to unfreeze locked array, so .sort can work on it
                return sortedReservations.map(reservation => <li key={reservation.id}><Link to={'/reservation/' + reservation.id}>Rezerwacja numer {reservation.number}</Link></li>)
            } else{
                return <li>Brak rezerwacji w bazie danych!</li>
            }
        }
        
    }

    return(
        <section className="wrapper">
            <header className="title"><p>Lista wszystkich dostępnych rezerwacji:</p></header>
            <button className="refresh" onClick={() => refetch()}>Odśwież</button>
            <ul>
                {displayReservations()}
            </ul>
        </section>
    )
}

export default ReservationList;