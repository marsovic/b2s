import React, { Component } from "react";

import CSV from "../CSV/processingCSV"
import Rooms from "./Rooms/Rooms"
import Circuits from "./Circuits/Circuits"

/*

// HOW TO USE 

- in render:
    <Circuits />

*/

class FormCircuits extends Component {
    state = {
        rooms: null,
        circuits: null,
        physics: null,
        loading: false,
        areCircuitsSelected: false,
        areRoomsSelected: false
    }

    handleFile = (data1, data2) => {
        var listRoom = data1;

        for (var key of Object.keys(listRoom)) {
            listRoom[key]['isCircuit'] = false;
            listRoom[key]['isRoom'] = false;
        }

        this.setState({ rooms: listRoom });
    }

    handleCircuits = (newState, circ) => {
        this.setState({ areCircuitsSelected: newState, circuits: circ })
    }

    handleRooms = (newState, rooms, circuits, physics) => {
        this.setState({
            areRoomsSelected: newState,
            rooms: rooms,
            circuits: circuits,
            physics: physics
        })
    }

    render() {

        let toShow = null;

        if (this.state.rooms !== null) { // a file is already selected
            if (this.state.areCircuitsSelected === true) { // circuits are defined
                if (this.state.areRoomsSelected === true) { // all rooms have a circuit
                    const formElementsArray = [];
                    for (let key in this.state.orderForm) {
                        formElementsArray.push({
                            id: key,
                            config: this.state.orderForm[key]
                        })
                    }

                    // Create the future text file with all data
                    let toPassToTheAlgorithm = [];
                    let toPassToLouis = [];
                    for (let item in this.state.rooms) {
                        let tempItem =
                            this.state.rooms[item].name + " @#@ " +
                            this.state.circuits[item] + " @#@ " +
                            this.state.physics[item];
                        
                        let tempItemLouis = {
                            "Circuit": this.state.circuits[item],
                            "Room": this.state.rooms[item].name,
                            "Physic": this.state.physics[item]
                        }

                        toPassToTheAlgorithm.push(tempItem);
                        toPassToLouis.push(tempItemLouis);
                    }

                    console.log(JSON.stringify(toPassToLouis) )
                    toShow = toPassToTheAlgorithm.map(items => {
                        return <p> {items} </p>
                    });
                } else {
                    // Rooms does not all have a circuit
                    toShow = <Rooms rooms={this.state.rooms} circuits={this.state.circuits} handleRooms={this.handleRooms} />
                }
            } else {
                // Circuits are not selectionned yet
                toShow = <Circuits rooms={this.state.rooms} handleCircuits={this.handleCircuits} />
            }
        } else {
            toShow =
                <div>
                    <h2> Sélection du fichier CSV à traiter </h2>
                    <CSV sendJSON={this.handleFile} />
                </div>
        }

        return (
            <div>
                {toShow}
            </div>
        )

    }
}

export default FormCircuits;
