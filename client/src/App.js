import React, { Component } from "react";
import "./App.css";
import AdForm from "./components/AdForm.js"
import EmailListForm from "./components/EmailListForm.js"
import AirlineSettings from "./components/AirlineSettings.js"
import { Row, Col, Navbar } from "react-bootstrap";
import SideNav from "./components/SideNav"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Row>
            <Col>
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                  <img
                    alt=""
                    src="./logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />
                  {'airDEM'}
                </Navbar.Brand>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <SideNav></SideNav>
            </Col>
            <Col xs={9}>
              <Switch>
                <Route path="/campaigns" component={AdForm} />
                <Route path="/emailList" component={EmailListForm} />
                <Route exact path="/" component={AirlineSettings} />
              </Switch>
            </Col>
          </Row>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;
