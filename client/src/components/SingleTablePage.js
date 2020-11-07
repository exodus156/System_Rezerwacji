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
            return <li className="mb-2 py-2 font-semibold">Wczytywanie danych...</li>
        } else if(error){
            console.log(error);
            return <li className="mb-2 py-2 font-semibold">Błąd, sprawdź konsolę</li>
        } else{
            return(
                <ul>
                    <li className="mb-2 py-2">Numer stolika: <span className="font-semibold">{data.table.number}</span></li>
                    <li className="mb-2 py-2">Ilość miejsc przy stoliku: <span className="font-semibold">{data.table.seats}</span></li>
                </ul>
            )
        }
    }

    const displayConnectedReservations = () => {
        if(loading){
            return <li className="mb-2 py-2 font-semibold">Wczytywanie danych...</li>
        } else if(error){
            console.log(error);
            return <li className="mb-2 py-2 font-semibold">Błąd, sprawdź konsolę</li>
        } else {
            const sortedArray = data.table.reservations.slice().sort((a, b) => {return a.number - b.number});
            if(sortedArray.length !== 0){
                return sortedArray.map(reservation => <li key={reservation.id} className="mb-2 py-2 hover:bg-green-500"><Link to={'/reservation/' + reservation.id}>Rezerwacja numer: <span className="font-semibold">{reservation.number}</span></Link></li>)
            } else{
                return <li className="mb-2 py-2 font-semibold">Brak rezerwacji powiązanych z wybranym stolikiem!</li>
            }
        }
    }

    const deleteDisplayedTable = () => {
        if(data.table.reservations.length !== 0){
            return buttonResponseArea.current.innerHTML =`
                <p class="font-semibold">Przed usunięciem stolika, należy usunąć wszystkie rezerwacje z nim związane.</p>
            `
        } else{
            deleteTable({variables: {
                id: props.match.params.table_id
            }})
            history.replace('/tablelist')
        }
    }

    return(
        <section className="p-8 h-screen flex justify-center items-start">
            <div className="container text-center shadow bgColor py-4 align-middle">
                <div className="tableDetails">
                    <p className="text-lg font-semibold">Szczegółowe informacje:</p>
                    {displayDetails()}
                </div>
                <div className="connectedReservationsList">
                    <p className="text-lg font-semibold px-4">Lista rezerwacji powiązanych z wybranym stolikiem:</p>
                    <ul>
                        {displayConnectedReservations()}
                    </ul>
                </div>
                <button type="button" className="bg-green-600 hover:bg-red-700 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center my-2" onClick={deleteDisplayedTable}>
                    <i className="fas fa-times fill-current w-4 h-4 mr-2 text-gray-300"></i>
                    <span>Usuń stolik</span>
                </button>
                <div className="buttonResponseSection" ref={buttonResponseArea}>
                    
                </div>
            </div>
        </section>
    )
}

export default TablePage;