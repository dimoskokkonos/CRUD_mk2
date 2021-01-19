import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ShowAll from "./components/showAll";
import Add from "./components/add";
import Update from "./components/update";
import { Menu } from 'antd';

import 'antd/dist/antd.css';
import "./App.css";

const App = () => {
  
  return (
    <div>
      <Router>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link to="/">Dimosthenis Kokkonos</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/SelectAll">Select All</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/Add">Add</Link>
          </Menu.Item>  
          
          <Menu.Item>
            <Link to="/Update">Update</Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/SelectAll" component={ ShowAll }/>
          <Route exact path="/Add" component={ Add } />
          <Route exact path="/Update" component={ Update } />
        </Switch>
      </Router>
    </div>

  );
};

export default App;