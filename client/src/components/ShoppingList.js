import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

class ShoppingList extends Component {
  state = {
    items: [
      { id: uuidv4(), name: "Tomatoes" },
      { id: uuidv4(), name: "Tuna" },
      { id: uuidv4(), name: "Chicken" },
      { id: uuidv4(), name: "Cheese" }
    ]
  };

  render() {
    const { items } = this.state;
    return (
      <Container>
        <Button
          color="secondary"
          style={{ marginBottom: "1rem" }}
          onClick={() => {
            const name = prompt("Enter item name:");
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuidv4(), name }]
              }));
            }
          }}
        >
          Add item
        </Button>

        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={300} classNames="item">
                <ListGroupItem className="itemEntry">
                  {name}
                  <Button
                    className="remove-btn"
                    size="sm"
                    outline
                    color="danger"
                    onClick={() => {
                      this.setState(state => ({
                        items: state.items.filter(item => item.id !== id)
                      }));
                    }}
                  >
                    &times;
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default ShoppingList;
