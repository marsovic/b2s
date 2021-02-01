import React, { Component } from "react";

import Aux from "../../../../hoc/Aux/Aux"

//BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
import LinearChart from '../Graphiques/LinearChart/LinearChart';
import Line from "recharts";
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table'

//COMPOSANTS MAISON
import Problems from "./Problems"

class Advices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '',
            currentRoom : this.props.currentRoom,
            data : this.props.data,
            advices : this.props.advices,

        }
    }

    render() {

        /*console.log("full data", this.state.data)
        console.log("advices", this.state.advices)
        console.log("schema", this.state.schema)
        console.log("columnsName", this.state.columnsName)*/

        return (
            <Tab.Container id="left-tabs-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Problems />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Problems />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )

        /* return (
             <Aux >
                 <LinearChart data={this.state.data} columns={this.state.columnsName} />
             </Aux>
         )*/

    }
}

export default Advices;