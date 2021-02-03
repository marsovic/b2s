import React, { Component } from "react";

//BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import LinearChart from '../Graphiques/LinearChart/LinearChart';
import Table from 'react-bootstrap/Table'

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
                let dateToShow = (<td>De {this.state.problems[key].debut} à {this.state.problems[key].fin}</td>);
                if(this.state.problems[key].debut === this.state.problems[key].fin) {
                    dateToShow = (<td>{this.state.problems[key].debut}</td>);
                } 

                return (
                    <tr>
                        {dateToShow}
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
        let problem;
        for (let i in this.state.problems) {
            if (this.state.problems[i].debut === event.target.id)
                problem = this.state.problems[i];
        }

        let tempGraphData = [];
        let tempGraphColumn = [];

        let startDate;
        let endDate;
        let dateColumn;
        let startCollect = false;
        let endCollect = false;

        startDate = problem.display_Debut.slice(8, 10) + "/" + problem.display_Debut.slice(5, 7) + "/" + problem.display_Debut.slice(0, 4) + " " + problem.display_Debut.slice(11)
        endDate = problem.display_Fin.slice(8, 10) + "/" + problem.display_Fin.slice(5, 7) + "/" + problem.display_Fin.slice(0, 4) + " " + problem.display_Fin.slice(11)

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
                let actualIdeal = null;

                for(let i in this.props.schema) {
                    if(this.props.schema[i]["Room"] === this.state.currentRoom) {
                        actualIdeal = parseInt(this.props.schema[i]["IdealPhysic"])
                    }
                }


                if(actualIdeal !== null) {
                    tempGraphData.push({ 
                        [dateColumn]: this.state.data[i][dateColumn], 
                        [this.state.currentRoom]: this.state.data[i][this.state.currentRoom],
                        "temperature de confort":  actualIdeal,
                        "temperature de confort basse":  (actualIdeal*1.1),
                        "temperature de confort haute":  (actualIdeal*0.9)
                    });
                } else {
                    tempGraphData.push({ 
                        [dateColumn]: this.state.data[i][dateColumn], 
                        [this.state.currentRoom]: this.state.data[i][this.state.currentRoom],
                    });
                }
            }

            if (this.state.data[i][dateColumn] === endDate && startCollect === true) {
                endCollect = true;
            }
        }

        let tempGraph = <LinearChart data={tempGraphData} columns={tempGraphColumn} refAreaLeft="12/2/20" refAreaRight="12/3/20"/>

    
        this.setState({
            modalShow: true,
            graphData: tempGraphData,
            graphColumn: tempGraphColumn,
            graph : tempGraph
        });

    }

    render() {

        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Période de l'anomalie</th>
                            <th>Afficher</th>
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
                        <Button onClick={() => this.hideModal()}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
            </>

        )

    }
}

export default Problems;

