import { gql } from 'apollo-boost';

/* Zapytania i mutacje dla stolików */
export const getTableQuery = gql`
    query getTable($id: String!){
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
    query getTables {
        tables{
            id
            number
            seats
        }
    }
`

export const addTableMutation = gql`
    mutation addTable($number: Int!, $seats: Int!, $reserved: Boolean!){
        addTable(number: $number, seats: $seats, reserved: $reserved){
            number
            seats
        }
    }
`

export const removeTableMutation = gql`
    mutation removeTable($id: String!){
        removeTable(id: $id){
            id
        }
    }
`

/* Zapytania i mutacje dla rezerwacji */
export const getReservationQuery = gql`
    query getReservation($id: String!){
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
    query getReservations {
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
    mutation addReservation()
`