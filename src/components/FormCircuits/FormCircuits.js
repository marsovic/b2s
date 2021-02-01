import React, { Component } from "react";
import axios from "axios";

import CSV from "../CSV/processingCSV"
import Rooms from "./Rooms/Rooms"
import Circuits from "./Circuits/Circuits"
import Days from "./Days/Days"


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
        idealPhysic: null,
        loading: false,
        daysOff: null,
        openHours: null,
        file: null,
        areCircuitsSelected: false,
        areRoomsSelected: false
    }

    handleFile = (data1, data2, file) => {
        var listRoom = data2;
        for (var key of Object.keys(listRoom)) {
            listRoom[key]['isCircuit'] = false;
            listRoom[key]['isRoom'] = false;
        }

        this.setState({
            rooms: listRoom,
            loading: true,
            file: file
        });

        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
                "X-Parse-Session-Token": sessionStorage.getItem("token")
            }
        };

        let url = "https://parseapi.back4app.com/users/" + this.props.userId;

        const updatedUser = {
            "columns": JSON.stringify(data1),
            "data": JSON.stringify(data2)
        }

        axios
            .put(url, updatedUser, options)
            .then((res) => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
            });

    }

    handleCircuits = (newState, circ) => {
        this.setState({ areCircuitsSelected: newState, circuits: circ })
    }

    handleRooms = (newState, rooms, circuits, physics, ideal) => {
        this.setState({
            areRoomsSelected: newState,
            rooms: rooms,
            circuits: circuits,
            physics: physics,
            idealPhysic: ideal
        })
    }

    handleDays = (days, hours) => {
        this.setState({
            daysOff: days,
            openHours: hours
        })
    }

    render() {

        let toShow = null;

        if (this.state.rooms !== null) { // a file is already selected
            if (this.state.areCircuitsSelected === true) { // circuits are defined
                if (this.state.areRoomsSelected === true) { // all rooms have a circuit
                    if (this.state.daysOff !== null && this.state.openHours !== null) {
                        const formElementsArray = [];
                        for (let key in this.state.orderForm) {
                            formElementsArray.push({
                                id: key,
                                config: this.state.orderForm[key]
                            })
                        }

                        let toPassToLouis = [];
                        for (let item in this.state.rooms) {
                            if (this.state.circuits[item] !== "none") {
                                let tempItemLouis = {
                                    "Circuit": this.state.circuits[item],
                                    "Room": this.state.rooms[item].name,
                                    "Physic": this.state.physics[item],
                                    "IdealPhysic": this.state.idealPhysic[item]
                                }

                                toPassToLouis.push(tempItemLouis);
                            }
                        }
                        console.log(toPassToLouis)
                        this.props.handleSchema(toPassToLouis, this.state.file, this.state.daysOff, this.state.openHours)

                    } else { // Days off or Hours where the building is open are not selectionned
                        toShow = <Days handleDays={this.handleDays} />
                    }
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
