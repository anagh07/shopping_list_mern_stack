import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onClickDelete = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        {/* <Button
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
        </Button> */}

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
                    onClick={this.onClickDelete.bind(this, id)}
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

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
