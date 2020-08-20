import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ChoiceList from "./components/choices-list.component";
import CreateChoice from "./components/create-choice.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ChoiceList} />
      <Route path="/createChoice" component={CreateChoice}/>
      </div>
    </Router>
  );
}

export default App;
