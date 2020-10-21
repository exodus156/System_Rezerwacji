import React, { useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getTableQuery, removeTableMutation } from '../queries';
import { Link, useHistory } from 'react-router-dom';

const TablePage = (props) => {
    const history = useHistory();
    const id = props.match.params.table_id;
    const {data, error, loading} = useQuery(getTableQuery, { variables: { id }});
    const [deleteTable] = useMutation(removeTableMutation);
    const buttonResponseArea = useRef(null);

    const displayDetails = () => {
        if(loading){
            return <li>Wczytywanie danych...</li>
        } else if(error){
            console.log(error);
            return <li>Błąd, sprawdź konsolę</li>
        } else{
            return(
                <ul>
                    <li>Numer stolika: {data.table.number}</li>
                    <li>Ilość miejsc przy stoliku: {data.table.seats}</li>
                </ul>
            )
        }
    }

    const displayConnectedReservations = () => {
        if(loading){
            return <li>Wczytywanie danych...</li>
        } else if(error){
            console.log(error);
            return <li>Błąd, sprawdź konsolę</li>
        } else {
            const sortedArray = data.table.reservations.slice().sort((a, b) => {return a.number - b.number});
            if(sortedArray.length !== 0){
                return sortedArray.map(reservation => <li key={reservation.id}><Link to={'/reservation/' + reservation.id}>Rezerwacja numer: {reservation.number}</Link></li>)
            } else{
                return <li>Brak rezerwacji powiązanych z wybranym stolikiem!</li>
            }
        }
    }

    const deleteDisplayedTable = () => {
        if(data.table.reservations.length !== 0){
            return buttonResponseArea.current.innerHTML =`
                <p>Przed usunięciem stolika, należy usunąć wszystkie rezerwacje z nim związane.</p>
            `
        } else{
            deleteTable({variables: {
                id: props.match.params.table_id
            }})
            history.replace('/tablelist')
        }
    }

    return(
        <section className="wrapper">
            <div className="tableDetails">
                <p>Szczegółowe informacje:</p>
                {displayDetails()}
            </div>
            <div className="connectedReservationsList">
                <p>Lista rezerwacji powiązanych z wybranym stolikiem:</p>
                <ul>
                    {displayConnectedReservations()}
                </ul>
            </div>
            <button type="button" onClick={deleteDisplayedTable}>Usuń stolik</button>
            <div className="buttonResponseSection" ref={buttonResponseArea}>
                
            </div>
        </section>
    )
}

export default TablePage;