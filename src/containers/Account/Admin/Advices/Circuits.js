import React, { Component } from "react";

//BOOTSTRAP
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


//COMPOSANTS MAISON
import Salles from "./Salles"

class Cicruits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '',
            columnsName: this.props.columnsName,
            data: this.props.data,
            schema: this.props.schema,
            advices: this.props.advices,
            circuits: [],
            circuitsDisplayed: null
        }

        this.state.circuitsDisplayed = Object.keys(this.state.schema)
            .map(key => {
                let toReturn = null;
                if (this.state.circuits.length !== 0) {

                    let currentCircuit;
                    let alreadyDone = false;
                    currentCircuit = this.state.schema[key].Circuit;

                    //On vérifie si on a déjà lancé l'initialisation du circuit sur lequel on se trouve
                    for (let j in this.state.circuits) {

                        if (this.state.circuits[j] === currentCircuit) {

                            alreadyDone = true;
                        }
                    }

                    //Si aucun circuit du même n'a été traité, on peut le créer
                    if (alreadyDone === false) {

                        let rooms = [];
                        this.state.circuits.push(currentCircuit);
                        //On parcours ce même tableau et on récupère le nom des salles présentes dedans 
                        for (let iterator in this.state.schema) {

                            if (this.state.schema[iterator].Circuit === currentCircuit
                                && this.state.schema[iterator].Room.toLowerCase().includes("circuit".toLowerCase()) !== true
                                && this.state.schema[iterator].Room.toLowerCase().includes("date".toLowerCase()) !== true
                                && this.state.schema[iterator].Room.toLowerCase().includes("heure".toLowerCase()) !== true) {

                                rooms.push(this.state.schema[iterator].Room);

                            }
                        }
                        if (rooms.length !== 0)
                            toReturn = (
                                <Tab eventKey={currentCircuit} title={currentCircuit}>
                                    <Salles
                                        circuit={currentCircuit}
                                        rooms={rooms}
                                        schema={this.props.schema}
                                        data={this.state.data}
                                        advices={this.state.advices}
                                        columnsName={this.state.columnsName} />
                                </Tab>
                            )

                    }
                }
                else {

                    let currentCircuit;
                    currentCircuit = this.state.schema[key].Circuit;
                    let rooms = [];

                    this.state.circuits.push(currentCircuit);

                    //On parcours ce même tableau et on récupère le nom des salles présentes dedans 
                    for (let iterator in this.state.schema) {
                        if (this.state.schema[iterator].Circuit === currentCircuit
                            && this.state.schema[iterator].Room.toLowerCase().includes("circuit".toLowerCase()) !== true
                            && this.state.schema[iterator].Room.toLowerCase().includes("date".toLowerCase()) !== true
                            && this.state.schema[iterator].Room.toLowerCase().includes("heure".toLowerCase()) !== true) {

                            /*if (this.state.schema[iterator].Room.toLowerCase().includes("Ã©".toLowerCase()) === true) {
                                rooms.push(this.state.schema[iterator].Room.toLowerCase().replaceAll("Ã©".toLowerCase(),"é"));
                            }*/
                            rooms.push(this.state.schema[iterator].Room);

                        }
                    }

                    if (rooms.length !== 0)
                        toReturn = (<Tab eventKey={currentCircuit} title={currentCircuit}> <Salles circuit={currentCircuit} rooms={rooms} data={this.state.data} advices={this.state.advices} columnsName={this.state.columnsName} /> </Tab>)
                }
                return toReturn;
            })
    }

    render() {
        return (
            <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
            >
                {this.state.circuitsDisplayed}
            </Tabs>
        )
    }
}

export default Cicruits;