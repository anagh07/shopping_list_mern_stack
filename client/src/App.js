import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";
import AddItemForm from "./components/AddItemForm";

import store from "./store";
import { Provider } from "react-redux";
import { Container } from "reactstrap";

class App extends React.Component {
  componentDidMount() {
    document.title = "List App";
  }
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <AddItemForm />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
