import React, { Component } from "react";

import Button from "../UI/Button/Button"
import Input from "../UI/Input/Input"
import CSV from "../CSV/processingCSV"
import Rooms from "./Rooms/Rooms"
import Circuits from "./Circuits/Circuits"

class FormCircuits extends Component {
    state = {
        rooms: null,
        loading: false,
        circuits: null,
        areCircuitsSelected: false,
        areRoomsSelected: false
    }

    handleFile = (data1, data2) => {
        var listRoom = data1;

        for(var key of Object.keys(listRoom)) {
            listRoom[key]['isCircuit'] = false;
            listRoom[key]['isRoom'] = false;
        }

        console.log(data1)
        console.log(data2)

        this.setState({ rooms: listRoom });
    }

    handleCircuits = (newState, circ) => {
        this.setState({areCircuitsSelected: newState, circuits: circ})
    }

    handleRooms = (newState) => {
        this.setState({areRoomsSelected: newState})
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

                    toShow = (
                        <div>
                            <h2> Paramétrages des Circuits et des Salles</h2>
                            {this.state.rooms.map(formElement => (
                                <Input
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                            ))}

                            <div>
                                <div> {this.state.errorMessage}</div>
                                <div style={{ color: "green" }}> {this.state.successMessage}</div>
                            </div>

                            <Button
                                btnType="Success"
                                value="Submit"
                                disabled={!this.state.formIsValid}
                                clicked={this.requestAdd}> Suivant </Button>
                        </div>
                    );
                } else {
                    // Rooms does not all have a circuit
                    toShow= <Rooms rooms={this.state.rooms} circuits={this.state.circuits} />
                }
            } else {
                // Circuits are not selectionned yet
                toShow= <Circuits rooms={this.state.rooms} handleCircuits={this.handleCircuits}/>
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
