import React, { Component } from "react";

//BOOTSTRAP
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav';

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
                        <Problems schema={this.props.schema} key={this.state.advices[key].nom + 2} currentAdvice={this.state.advices[key].nom} data={this.state.data} problems={problemsList} currentRoom={this.state.currentRoom} columnsName = {this.state.columnsName}/>
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

        /* return (
             <Aux >
                 <LinearChart data={this.state.data} columns={this.state.columnsName} />
             </Aux>
         )*/

    }
}

export default Advices;