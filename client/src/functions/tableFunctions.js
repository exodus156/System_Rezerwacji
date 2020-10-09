const getTable = (id) => {
    const { loading, error, data } = useQuery(getTableQuery, {
        variables: {
            id
        }
    });

    if(loading) console.log("loading getTable");
    if(error) console.log("error getTable");

    return data
}

const getTables = () => {
    const { loading, error, data } = useQuery(getTablesQuery);
    if(loading) console.log("loading getTables");
    if(error) console.log("error getTables");

    return data
}



const removeTable = (id) => {
    const [removeTableMut, { data }] = useMutation(removeTableMutation);
    return removeTableMut({variables: {
        id
    }})
}

const tableActions = (id, number, seats, action) => {
    switch(action){
        case 'SELECTED_TABLE':
            return getTable(id);

        case 'ALL_TABLES':
            return getTables();            

        case 'ADD_TABLE':
            const reserved = false;
            return addTable(number, seats, reserved);

        case 'REMOVE_TABLE':
            return removeTable(id);
    }
}