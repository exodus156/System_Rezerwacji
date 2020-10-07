import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route } from 'react-router-dom';
import Title from './components/Title';
import Navbar from './components/Navbar';
import Home from './components/HomePage';
import AddReservation from './components/ReservationPage';
import AddTable from './components/TablePage';
import TablePage from './components/SingleTablePage';
import ReservationPage from './components/SingleReservationPage'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', //Change later for live version
     cache: new InMemoryCache( ),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Title />
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/addreservation" component={AddReservation} />
          <Route path="/addtable" component={AddTable} />
          <Route path="/table/:table_id" component={TablePage} />
          <Route path="/reservation/:reservation_id" component={ReservationPage} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
