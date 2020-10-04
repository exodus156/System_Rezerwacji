import { getReservation, getReservations, addReservation, removeReservation } from '../functions/reservationFunctions'

export const reservationActions = (id, number, date, timeStart, timeEnd, people, tableID, action) => {
    switch(action){
        case 'SELECTED_RESERVATION':
            return getReservation(id);

        case 'ALL_RESERVATION':
            return getReservations();

        case 'ADD_RESERVATION':
            return addReservation(number, date, timeStart, timeEnd, people, tableID);

        case 'REMOVE_RESERVATION':
            return removeReservation(id);
    }
}