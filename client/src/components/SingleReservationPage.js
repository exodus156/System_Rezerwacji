import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getReservationQuery, removeReservationMutation } from '../queries';
import { Link, useHistory } from 'react-router-dom';

const ReservationPage = (props) => {
    const history = useHistory();
    const id = props.match.params.reservation_id;
    const {data, error, loading} = useQuery(getReservationQuery, { variables: { id }});
    const [deleteReservation] = useMutation(removeReservationMutation);
    
    const displayDetails = () => {
        if(loading){
            return <li>Wczytywanie danych...</li>
        } else if(error){
            console.log(error);
            return <li>Błąd, sprawdź konsolę</li>
        } else{
            const timeStart = data.reservation.timeStart.toString().slice(0, 2) + ':' + data.reservation.timeStart.toString().slice(2, 4)
            const timeEnd = data.reservation.timeEnd.toString().slice(0, 2) + ':' + data.reservation.timeEnd.toString().slice(2, 4)
            return(
                <ul>
                    <li>Numer rezerwacji: {data.reservation.number}</li>
                    <li>Ilość osób: {data.reservation.people}</li>
                    <li>Data rezerwacji: {data.reservation.date}</li>
                    <li>Godzina rozpoczęcia rezerwacji: {timeStart}</li>
                    <li>Godzina zakończenia rezerwacji: {timeEnd}</li>
                    <li><Link to={'/table/' + data.reservation.table.id}>Numer stolika powiązanego z rezerwacją: {data.reservation.table.number}</Link></li>
                </ul>
            )
        }
    }

    const deleteDisplayedReservation = () => {
        deleteReservation({variables: {id: props.match.params.reservation_id}});
        history.replace('/reservationlist')
    }
    
    return(
        <section className="container px-8">
            <div className="reservationDetails">
                <p>Szczegółowe informacje:</p>
                {displayDetails()}
            </div>
            <button type="button" onClick={deleteDisplayedReservation}>Usuń rezerwację</button>
        </section>
    )
}

export default ReservationPage;