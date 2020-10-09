import { gql } from 'apollo-boost';

/* Zapytania i mutacje dla stolików */
export const getTableQuery = gql`
    query GetTable($id: String!){
        table(id: $id){
            number
            seats
            reservations{
                number
                date
                timeStart
                timeEnd
                people
            }
        }
    }
`

export const getTablesQuery = gql`
    query GetTables {
        tables{
            id
            number
            seats
        }
    }
`

export const addTableMutation = gql`
    mutation AddTable($number: Int!, $seats: Int!, $reserved: Boolean!){
        addTable(number: $number, seats: $seats, reserved: $reserved){
            id
        }
    }
`

export const removeTableMutation = gql`
    mutation RemoveTable($id: String!){
        removeTable(id: $id){
            id
        }
    }
`

/* Zapytania i mutacje dla rezerwacji */
export const getReservationQuery = gql`
    query GetReservation($id: String!){
        reservation(id: $id){
            number
            date
            timeStart
            timeEnd
            people
            table{
                number
                seats
            }
        }
    }
`

export const getReservationsQuery = gql`
    query GetReservations {
        reservations{
            id
            number
            date
            timeStart
            timeEnd
        }
    }
`

export const addReservationMutation = gql`
    mutation AddReservation($number: Int!, $date: String!, $timeStart: Int!, $timeEnd: Int!, $people: Int!, $tableid: String!){
        addReservation(number: $number, date: $date, timeStart: $timeStart, timeEnd: $timeEnd, people: $people, tableId: $tableid){
            id
        }
    }
`

export const removeReservationMutation = gql`
    mutation RemoveReservation($id: String!){
        removeReservation(id: $id){
            id
        }
    }
`