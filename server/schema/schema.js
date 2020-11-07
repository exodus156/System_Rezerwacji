const graphql = require('graphql');
const Reservation = require('../models/reservationModel');
const Table = require('../models/tableModel');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
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
                return Table.findById(parent.tableId);
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
                return Reservation.find({ tableId: parent.id });
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
                return Table.findById(args.id);
            }
        },
        reservation: {
            type: ReservationType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Reservation.findById(args.id);
            }
        },
        tables: {
            type: new GraphQLList(TableType),
            resolve(parent, args){
                return Table.find({});
            }
        },
        reservations: {
            type: new GraphQLList(ReservationType),
            resolve(parent, args){
                return Reservation.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addReservation: {
            type: ReservationType,
            args: {
                number: {type: new GraphQLNonNull(GraphQLInt)},
                date: {type: new GraphQLNonNull(GraphQLString)},
                timeStart: {type: new GraphQLNonNull(GraphQLInt)},
                timeEnd: {type: new GraphQLNonNull(GraphQLInt)},
                people: {type: new GraphQLNonNull(GraphQLInt)},
                tableId: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let reservation = new Reservation({
                    number: args.number,
                    date: args.date,
                    timeStart: args.timeStart,
                    timeEnd: args.timeEnd,
                    people: args.people,
                    tableId: args.tableId
                });
                return reservation.save();
            }
        },

        addTable: {
            type: TableType,
            args: {
                number: {type: new GraphQLNonNull(GraphQLInt)},
                seats: {type: new GraphQLNonNull(GraphQLInt)},
                reserved: {type: new GraphQLNonNull(GraphQLBoolean)}
            },
            resolve(parent, args){
                let table = new Table({
                    number: args.number,
                    seats: args.seats,
                    reserved: args.reserved
                });
                return table.save();
            }
        },

        removeReservation: {
            type: ReservationType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return Reservation.findByIdAndDelete(args.id)
            }
        },

        removeTable: {
            type: TableType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return Table.findByIdAndDelete(args.id)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})