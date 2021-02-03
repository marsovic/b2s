import React, { Component } from "react";

//BOOTSTRAP
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav';


//COMPOSANTS MAISON
import Advices from "./Advices"

class Salles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '',
            circuit: this.props.circuit,
            columnsName: this.props.columnsName,
            rooms: this.props.rooms,
            data: this.props.data,
            advices: this.props.advices,
            nav: null,
            content: null,

        }

        this.state.nav = Object.keys(this.state.rooms)
            .map(key => {
                return (
                    <Nav.Item>
                        <Nav.Link key={this.state.rooms[key] + 1} eventKey={this.state.rooms[key]}>{this.state.rooms[key]}</Nav.Link>
                    </Nav.Item>
                )
            })

        this.state.content = Object.keys(this.state.rooms)
            .map(key => {
                let advicesList = [];

                for (let i in this.state.advices) {
                    if (this.state.advices[i]) {
                        if (this.state.advices[i].salle === this.state.rooms[key]) {
                            advicesList = this.state.advices[i].anomalie;
                        }
                    }

                }
                return (
                    <Tab.Pane eventKey={this.state.rooms[key]}>
                        <Advices key={this.state.rooms[key] + 2} currentRoom={this.state.rooms[key]} data={this.state.data} advices={advicesList} schema={this.props.schema} columnsName = {this.state.columnsName}/>
                    </Tab.Pane>
                )
            })

    }

    render() {
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
    }
}

export default Salles;