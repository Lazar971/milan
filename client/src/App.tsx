import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import JavniPozivPage from './pages/JavniPozivPage';
import RadnikPage from './pages/RadnikPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route path='/javniPoziv/kreiraj'>

        </Route>
        <Route path='/javniPoziv'>
          <JavniPozivPage ></JavniPozivPage>
        </Route>

        <Route path='/radnik'>
          <RadnikPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
