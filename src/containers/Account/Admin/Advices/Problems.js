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

class Problems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '',

        }
    }

    render() {

        /*console.log("full data", this.state.data)
        console.log("advices", this.state.advices)
        console.log("schema", this.state.schema)
        console.log("columnsName", this.state.columnsName)*/

        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Voir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>12/12/2020</td>
                        <td>00:01</td>
                        <td><Button /></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>12/12/2020</td>
                        <td>00:01</td>
                        <td><Button /></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>12/12/2020</td>
                        <td>00:01</td>
                        <td><Button /></td>
                    </tr>
                </tbody>
            </Table>
        )

        /* return (
             <Aux >
                 <LinearChart data={this.state.data} columns={this.state.columnsName} />
             </Aux>
         )*/

    }
}

export default Problems;

