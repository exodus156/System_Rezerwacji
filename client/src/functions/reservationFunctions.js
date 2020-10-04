import { useQuery, useMutation } from '@apollo/react-hooks';
import { getReservationQuery, getReservationsQuery, addReservationMutation, removeReservationMutation } from '../queries';

export const getReservation = (id) => {
    const { loading, error, data } = useQuery(getReservationQuery, {
        variables: {
            id
        }
    });

    if(loading) console.log("loading getReservation");
    if(error) console.log("error getReservation");

    return data
}

export const getReservations = () => {
    const { loading, error, data } = useQuery(getReservationsQuery);
    if(loading) console.log("loading getReservations");
    if(error) console.log("error getReservations");

    return data
}

export const addReservation = (number, date, timeStart, timeEnd, people, tableId) => {
    const [addReservationMut, { data }] = useMutation(addReservationMutation);
    return addReservationMut({ variables: {
        number,
        date,
        timeStart,
        timeEnd,
        people,
        tableId
    }});
}

export const removeReservation = (id) => {
    const [removeReservationMut, { data }] = useMutation(removeReservationMutation);
    return removeReservationMut({variables: {
        id
    }})
}