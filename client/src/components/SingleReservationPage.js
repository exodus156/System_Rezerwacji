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
                    <li className="mb-2 py-2">Numer rezerwacji: <span className="font-semibold">{data.reservation.number}</span></li>
                    <li className="mb-2 py-2">Ilość osób: <span className="font-semibold">{data.reservation.people}</span></li>
                    <li className="mb-2 py-2">Data rezerwacji: <span className="font-semibold">{data.reservation.date}</span></li>
                    <li className="mb-2 py-2">Godzina rozpoczęcia rezerwacji: <span className="font-semibold">{timeStart}</span></li>
                    <li className="mb-2 py-2">Godzina zakończenia rezerwacji: <span className="font-semibold">{timeEnd}</span></li>
                    <li className="mb-2 py-2 hover:bg-green-500"><Link to={'/table/' + data.reservation.table.id}>Numer stolika powiązanego z rezerwacją: <span className="font-semibold">{data.reservation.table.number}</span></Link></li>
                </ul>
            )
        }
    }

    const deleteDisplayedReservation = () => {
        deleteReservation({variables: {id: props.match.params.reservation_id}});
        history.replace('/reservationlist')
    }
    
    return(
        <section className="p-8 h-screen flex justify-center items-start">
            <div className="container text-center shadow bgColor py-4 align-middle">
                <div className="reservationDetails">
                    <p className="text-lg font-semibold">Szczegółowe informacje:</p>
                    {displayDetails()}
                </div>
                <button type="button" className="bg-green-600 hover:bg-red-700 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center my-2" onClick={deleteDisplayedReservation}>
                    <i className="fas fa-times fill-current w-4 h-4 mr-2 text-gray-300"></i>
                    <span>Usuń rezerwację</span>
                </button>
            </div>
        </section>
    )
}

export default ReservationPage;