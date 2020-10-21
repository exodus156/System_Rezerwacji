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
                return sortedTables.map(table => <li key={table.id}><Link to={'/table/' + table.id}>Stolik numer {table.number} </Link></li>);
            } else{
                return <li>Brak stolików w bazie danych!</li>
            }
        }
    }

    return(
        <section className="wrapper">
            <header className="title"><p>Lista wszystkich dostępnych stolików:</p></header>
            <button className="refresh" onClick={() => refetch()}>Odśwież</button>
            <ul>
                {displayTables()}
            </ul>
        </section>
    )
}

export default TableList;