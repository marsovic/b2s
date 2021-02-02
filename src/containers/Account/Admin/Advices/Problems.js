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
            columnsName: this.props.columnsName,
            currentRoom: this.props.currentRoom,
            data: this.props.data,
            problems: this.props.problems,
            problemsDisplayed: null,
            modalShow: false,
            graphColumn: null,
            graphData: null,
            graph : null,

        }

        this.hideModal = this.hideModal.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);

        this.state.problemsDisplayed = Object.keys(this.state.problems)
            .map(key => {
                console.log("ADVICE -----------------------------", this.props.currentAdvice)
                console.log("problem", this.state.problems[key])

                return (

                    <tr>
                        <td>{this.state.problems[key].debut}</td>
                        <td><Button id={this.state.problems[key].debut} onClick={this.handleDisplay}>Voir</Button></td>
                    </tr>

                )

            })

    }



    hideModal() {
        this.setState({
            modalShow: false
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
        let tempGraphData = [];
        let tempGraphColumn = [];

        let startDate;
        let endDate;
        let dateColumn;
        let startCollect = false;
        let endCollect = false;

        startDate = problem.display_Debut.slice(8, 10) + "/" + problem.display_Debut.slice(5, 7) + "/" + problem.display_Debut.slice(0, 4) + " " + problem.display_Debut.slice(11)
        endDate = problem.display_Fin.slice(8, 10) + "/" + problem.display_Debut.slice(5, 7) + "/" + problem.display_Debut.slice(0, 4) + " " + problem.display_Debut.slice(11)

        for (let i in this.state.columnsName) {
            if (this.state.columnsName[i]) {
                if (this.state.columnsName[i].name.toLowerCase().includes("date")) {
                    dateColumn = this.state.columnsName[i].name;
                }
            }
        }

        tempGraphColumn.push({"name":dateColumn})
        tempGraphColumn.push({"name":this.state.currentRoom})

        for (let i in this.state.data) {
            if (this.state.data[i][dateColumn] === startDate && endCollect !== true) {
                startCollect = true;
            }

            if (startCollect === true && endCollect !== true) {
                tempGraphData.push({ [dateColumn]: this.state.data[i][dateColumn], [this.state.currentRoom]: this.state.data[i][this.state.currentRoom] });
            }
            if (this.state.data[i][dateColumn] === endDate && startCollect === true) {
                endCollect = true;
            }
        }
        //console.log("temp data",tempGraphData)
        //console.log("columns temp", tempGraphColumn)
        let tempGraph = <LinearChart data={tempGraphData} columns={tempGraphColumn} refAreaLeft="12/2/20" refAreaRight="12/3/20"/>

    
        this.setState({
            modalShow: true,
            graphData: tempGraphData,
            graphColumn: tempGraphColumn,
            graph : tempGraph
        });

    }

    render() {

        //console.log("full data", this.state.data)
        //console.log("advices", this.state.advices)
        //console.log("schema", this.state.schema)
        //console.log("columnsName", this.state.columnsName)
        //console.log("problems", this.state.problems)
        return (
            <>
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

                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={this.state.modalShow} onHide={this.hideModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Graphique du problème
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    {this.state.graph}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.hideModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>

        )

        //<LinearChart data={this.state.graphData} columns={this.state.graphColumn} refAreaLeft="12/2/20" refAreaRight="12/3/20"/>


        /* return (
             <Aux >
                 <LinearChart data={this.state.data} columns={this.state.columnsName} />
             </Aux>
         )*/

    }
}

export default Problems;

