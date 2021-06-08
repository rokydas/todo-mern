import './App.css';
import Todos from './components/Todos/Todos';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  // const [user, setUser] = useState({});
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    // <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Todos />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    // </UserContext.Provider>
  );
}

export default App;
