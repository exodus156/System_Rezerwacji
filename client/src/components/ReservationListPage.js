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
                return sortedReservations.map(reservation => <li key={reservation.id} className="mb-2 py-2 font-semibold hover:bg-green-500"><Link to={'/reservation/' + reservation.id}>
                    <i className="fas fa-bookmark fill-current w-4 h-4 mr-2"></i>
                    <span>Rezerwacja numer {reservation.number}</span>
                </Link></li>)
            } else{
                return <li>Brak rezerwacji w bazie danych!</li>
            }
        }
        
    }

    return(
        <section className="p-8 h-screen flex justify-center items-start">
            <div className="container text-center shadow bgColor py-4 align-middle">
                <header className="title"><p className="text-lg font-semibold pb-3">Lista wszystkich dostępnych rezerwacji:</p></header>
                <button className="refresh bg-green-600 hover:bg-green-700 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center my-2" onClick={() => refetch()}>
                    <i className="fas fa-sync-alt fill-current w-4 h-4 mr-2 text-gray-300"></i>
                    <span>Odśwież</span>
                </button>
                <ul>
                    {displayReservations()}
                </ul>
            </div>
        </section>
    )
}

export default ReservationList;