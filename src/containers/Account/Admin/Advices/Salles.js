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
import Advices from "./Advices"

class Salles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '',
            circuit: this.props.circuit,
            rooms: this.props.rooms,
            data: this.props.data,
            advices: this.props.advices,
            nav: null,
            content: null,

        }

        this.state.nav = Object.keys(this.state.rooms)
            .map(key => {
                //console.log("this.state.rooms[key]",this.state.rooms[key])
                return (
                    <Nav.Item>
                        <Nav.Link eventKey={this.state.rooms[key]}>{this.state.rooms[key]}</Nav.Link>
                    </Nav.Item>
                )
            })

        this.state.content = Object.keys(this.state.rooms)
            .map(key => {
                return (
                    <Tab.Pane eventKey={this.state.rooms[key]}>
                        <Advices />
                    </Tab.Pane>
                )
            })

    }

    render() {

        /*console.log("full data", this.state.data)
        console.log("advices", this.state.advices)
        console.log("schema", this.state.schema)
        console.log("columnsName", this.state.columnsName)*/

        console.log("ROOMS", this.state.rooms)
        //console.log("circuit", this.state.circuit)

        //console.log("DATA", this.state.data)
        //console.log("ADVICES", this.state.advices)

        //console.log("nav",this.state.nav)
        //console.log("content",this.state.content)

        return (
            <Tab.Container id="left-tabs-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            {this.state.nav}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {this.state.content}
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

export default Salles;