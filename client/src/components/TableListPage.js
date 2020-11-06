import React from 'react';
import { useQuery } from '@apollo/client';
import { getTablesQuery } from '../queries';
import { Link } from 'react-router-dom';

const TableList = () => {
    const {data, error, loading, refetch} = useQuery(getTablesQuery);

    const displayTables = () => {
        if(loading){
            return <li>Wczytywanie stolików...</li>
        }
        else if(error){
            console.log(error);
            return <li>Błąd wczytywania, sprawdź konsolę</li>
        } 
        else {
            const tables = data.tables;
            if(tables.length !== 0){
                const sortedTables = tables.slice().sort((a, b) => {return a.number - b.number}); //.slice() to unfreeze locked array, so .sort can work on it
                return sortedTables.map(table => <li key={table.id} className="mb-2 py-2 font-semibold hover:bg-green-500"><Link to={'/table/' + table.id}>
                    <i className="fas fa-chair fill-current w-4 h-4 mr-2"></i>
                    <span>Stolik numer {table.number}</span>
                </Link></li>);
            } else{
                return <li>Brak stolików w bazie danych!</li>
            }
        }
    }

    return(
        <section className="p-8 h-screen flex justify-center items-start">
            <div className="container text-center shadow bgColor py-4 align-middle">
                <header className="title"><p className="text-lg font-semibold pb-3">Lista wszystkich dostępnych stolików:</p></header>
                <button className="refresh bg-green-600 hover:bg-green-700 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center my-2" onClick={() => refetch()}>
                    <i className="fas fa-sync-alt fill-current w-4 h-4 mr-2 text-gray-300"></i>
                    <span>Odśwież</span>
                </button>
                <ul>
                    {displayTables()}
                </ul>
            </div>
        </section>
    )
}

export default TableList;