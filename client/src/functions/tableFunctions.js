import { useQuery, useMutation } from '@apollo/react-hooks';
import { getTableQuery, getTablesQuery, addTableMutation, removeTableMutation } from '../queries';

export const getTable = (id) => {
    const { loading, error, data } = useQuery(getTableQuery, {
        variables: {
            id
        }
    });

    if(loading) console.log("loading getTable");
    if(error) console.log("error getTable");

    return data
}

export const getTables = () => {
    const { loading, error, data } = useQuery(getTablesQuery);
    if(loading) console.log("loading getTables");
    if(error) console.log("error getTables");

    return data
}

export const addTable = (number, seats, reserved) => {
    const [addTableMut, { data }] = useMutation(addTableMutation);
    return addTableMut({ variables: {
        number,
        seats,
        reserved
    }});
}

export const removeTable = (id) => {
    const [removeTableMut, { data }] = useMutation(removeTableMutation);
    return removeTableMut({variables: {
        id
    }})
}