import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "../actions/itemActions";

class AddItemForm extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      id: uuidv4(),
      name: this.state.name
    };

    this.props.addItem(newItem);

    this.setState({
        name: ""
    })
  };

  render() {
    return (
      <Container>
        <Row style={{ padding: "1rem" }}>
          <Col style={{ padding: "0rem" }}>
            <Form style={{ marginBottom: "1rem" }} onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item" className="mr-sm-2" hidden>
                  Add Item
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Enter item name..."
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col xs="2" style={{ padding: "0rem" }}>
            <Button style={{ width: "100%" }} onClick={this.onSubmit}>
              Add
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToPops = state => ({
  item: state.item
});

export default connect(mapStateToPops, { addItem })(AddItemForm);
