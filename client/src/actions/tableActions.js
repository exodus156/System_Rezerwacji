import { getTable, getTables, addTable, removeTable } from '../functions/tableFunctions'

export const tableActions = (id, number, seats, action) => {
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