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
            currentRoom: this.props.currentRoom,
            columnsName: this.props.columnsName,
            data: this.props.data,
            advices: this.props.advices,
            nav: null,
            content: null,

        }

        this.state.nav = Object.keys(this.state.advices)
            .map(key => {
                console.log("salle ------------------------------------------ ", this.props.currentRoom)
                //console.log("Advices", this.state.advices[key])
                //console.log("key", key)


                console.log("this.state.advices[key]", this.state.advices[key])
                //console.log("i", i)
                //console.log("conseil : " ,this.state.advices[key].nom)
                return (
                    <Nav.Item>
                        <Nav.Link key={this.state.advices[key].nom + 1} eventKey={this.state.advices[key].nom}>{this.state.advices[key].nom}</Nav.Link>
                    </Nav.Item>
                )


            })

        this.state.content = Object.keys(this.state.advices)
            .map(key => {


                let problemsList = this.state.advices[key].liste;

                return (
                    <Tab.Pane eventKey={this.state.advices[key].nom}>
                        <Problems key={this.state.advices[key].nom + 2} currentAdvice={this.state.advices[key].nom} data={this.state.data} problems={problemsList} currentRoom={this.state.currentRoom} columnsName = {this.state.columnsName}/>
                    </Tab.Pane>
                )


            })

    }


    render() {
        //console.log("current room", this.state.currentRoom)

        //console.log("full data", this.state.data)
        console.log("advices", this.state.advices)
        //console.log("schema", this.state.schema)
        //console.log("columnsName", this.state.columnsName)

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

export default Advices;