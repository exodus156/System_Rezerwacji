const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

app.use(cors()); //Enable cross-section connection

/* Mongoose connection to database start */
mongoose.connect('mongodb+srv://admin:admin1234@nodeapp.gbe85.mongodb.net/NodeApp?retryWrites=true&w=majority', { 
    useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log("connected to database");
})

/* Mongoose connection to database end */

app.use('/graphql', graphqlHTTP({
    schema,
})); //Binding GraphQL with Express

app.listen(4000, () =>{
    console.log("listening to port 4000");
})