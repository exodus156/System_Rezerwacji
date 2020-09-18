const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = graphql;


/* Schemat rezerwacji */
const ReservationType = new GraphQLObjectType({
    name: 'Reservation',
    fields: () => ({
        id: {type: GraphQLID},
        number: {type: GraphQLInt},
        date: {type: GraphQLString},
        timeStart: {type: GraphQLInt},
        timeEnd: {type: GraphQLInt},
        people: {type: GraphQLInt},
        table: {
            type: TableType,
            resolve(parent, args){
                return table.find(table => table.id === parent.tableId); //Correct search method after creating mongoose model!!!!!
            }
        }
    })
});

/* Schemat stolika */
const TableType = new GraphQLObjectType({
    name: 'Table',
    fields: () => ({
        id: {type: GraphQLID},
        number: {type: GraphQLInt},
        seats: {type: GraphQLInt},
        reserved: {type: GraphQLBoolean},
        reservations:{
            type: new GraphQLList(ReservationType),
            resolve(parent, args){
                return reservation.filter(reservation => reservation.tableId === parent.id); //Correct search method after creating mongoose model!!!!!
            }
        }
    })
});


/* Root query */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        table: {
            type: TableType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return table.find(table => table.id === args.id); //Correct search method after creating mongoose model!!!!!
            }
        },
        reservation: {
            type: ReservationType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return reservation.find(reservation => reservation.id === args.id); //Correct search method after creating mongoose model!!!!!
            }
        },
        tables: {
            type: new GraphQLList(TableType),
            resolve(parent, args){
                return table.find(); //Correct search method after creating mongoose model!!!!!
            }
        },
        reservations: {
            type: new GraphQLList(ReservationType),
            resolve(parent, args){
                return reservation.find(); //Correct search method after creating mongoose model!!!!!
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})