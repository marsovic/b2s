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
                //console.log("this.state.circuits.length",this.state.circuits.length);
                //Si au moins un circuit a été traité 
                if (this.state.circuits.length !== 0) {

                    let currentCircuit;
                    let alreadyDone = false;
                    currentCircuit = this.state.schema[key].Circuit;

                    /*if (currentCircuit.toLowerCase().includes("Ã©".toLowerCase()) === true) {       
                        currentCircuit = currentCircuit.toLowerCase().replaceAll("Ã©".toLowerCase(),"é");
                    }*/

                    //On vérifie si on a déjà lancé l'initialisation du circuit sur lequel on se trouve
                    for (let j in this.state.circuits) {

                        if (this.state.circuits[j] === currentCircuit) {

                            alreadyDone = true;
                        }
                    }

                    //Si aucun circuit du même n'a été traité, on peut le créer
                    if (alreadyDone === false) {
                        //console.log("currentCircuit ---->",currentCircuit)

                        let rooms = [];
                        this.state.circuits.push(currentCircuit);
                        //On parcours ce même tableau et on récupère le nom des salles présentes dedans 
                        for (let iterator in this.state.schema) {
                            //console.log("iterator ---->",iterator)

                            //console.log("room ---->",this.state.schema[iterator].Room)
                            //console.log("TEST", this.state.schema[iterator].Room.toLowerCase().includes("circuit".toLowerCase()))
                            if (this.state.schema[iterator].Circuit === currentCircuit
                                && this.state.schema[iterator].Room.toLowerCase().includes("circuit".toLowerCase()) !== true
                                && this.state.schema[iterator].Room.toLowerCase().includes("date".toLowerCase()) !== true
                                && this.state.schema[iterator].Room.toLowerCase().includes("heure".toLowerCase()) !== true) {
                                /*console.log("all schema ---->",this.state.schema)
                                console.log("room ---->",this.state.schema[iterator].Room)
                                console.log("schema circuit ---->",this.state.schema[iterator].Circuit)*/
                                /*if (this.state.schema[iterator].Room.toLowerCase().includes("Ã©".toLowerCase()) === true) {       
                                    rooms.push(this.state.schema[iterator].Room.toLowerCase().replaceAll("Ã©".toLowerCase(),"é"));

                                }*/

                                rooms.push(this.state.schema[iterator].Room);

                            }
                        }
                        //console.log("rooms in circuits", rooms)
                        return (<Tab eventKey={currentCircuit} title={currentCircuit}> <Salles circuit={currentCircuit} rooms={rooms} data={this.state.data} advices={this.state.advices} /> </Tab>)

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

                    return (<Tab eventKey={currentCircuit} title={currentCircuit}> <Salles circuit={currentCircuit} rooms={rooms} data={this.state.data} advices={this.state.advices} /> </Tab>)


                }
            })


        /*this.state.circuits = Object.keys(this.state.schema)
            .map(key => {
              
                if(circuits !== null){

                }

                else{
                    return(this.state.schema[key].Circuit)
                }
                
            })*/

    }





    render() {
        //console.log("circuits", this.state.circuits);
        //console.log("CIRCUITS AFFICHES",this.state.circuitsDisplayed);


        //console.log("full data", this.state.data)
        //console.log("advices", this.state.advices)
        //console.log("schema", this.state.schema)
        //console.log("columnsName", this.state.columnsName)

        return (
            <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
            >
                {this.state.circuitsDisplayed}
            </Tabs>
        )

        /* return (
             <Aux >
                 <LinearChart data={this.state.data} columns={this.state.columnsName} />
             </Aux>
         )*/

    }
}

export default Cicruits;