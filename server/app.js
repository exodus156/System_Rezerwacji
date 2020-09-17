const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

//app.use(cors); //Enable cross-section connection

/* Mongoose connection to database start */

/* Mongoose connection to database end */

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //for testing connection, will remove later
})); //Binding GraphQL with Express

app.listen(4000, () =>{
    console.log("listening to port 4000");
})