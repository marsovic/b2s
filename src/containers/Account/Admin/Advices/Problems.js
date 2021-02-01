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
            currentAdvice: this.props.currentAdvice,
            data: this.props.data,
            problems: this.props.problems,
            problemsDisplayed: null,
        }

        this.handleDisplay = this.handleDisplay.bind(this);

        this.state.problemsDisplayed = Object.keys(this.state.problems)
            .map(key => {
                console.log("ADVICE -----------------------------", this.props.currentAdvice)
                console.log("problem", this.state.problems[key])

                return (

                    <tr>
                        <td>{this.state.problems[key].debut}</td>
                        <td><Button id={this.state.problems[key].debut} onClick={this.handleDisplay} /></td>
                    </tr>

                )

            })

    }

    handleDisplay(event) {
        console.log("WTF", this.state.problems)
        let problem;
        for (let i in this.state.problems) {
            if (this.state.problems[i].debut === event.target.id)
                problem = this.state.problems[i];
        }

        let data;

        for (let i in this.state.data) {
//------------------------------------------------------------------------------------------------------
        }

        console.log("debut", problem.debut)
        console.log("fin", problem.fin)



    }

    render() {

        console.log("full data", this.state.data)
        /*console.log("advices", this.state.advices)
        console.log("schema", this.state.schema)
        console.log("columnsName", this.state.columnsName)*/
        console.log("problems", this.state.problems)
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Voir</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.problemsDisplayed}
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

