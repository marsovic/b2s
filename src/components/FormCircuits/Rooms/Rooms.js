import React, { Component } from "react";

import styles from "./Rooms.module.css"


const PhysicList = [
    { "Température": "T" }
]

class Rooms extends Component {
    state = {
        circuits: this.props.circuits,
        rooms: this.props.rooms,
        loading: true,
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let circuitForRooms = [];
        const roomsOnPageCircuit = document.getElementsByName('roomForCircuits');
        for (let key in this.state.rooms) {
            circuitForRooms.push(roomsOnPageCircuit[key].value)
        }

        let physicForRooms = [];
        const roomsOnPagePhysic = document.getElementsByName('roomForPhysic');
        for (let key in this.state.rooms) {
            physicForRooms.push(roomsOnPagePhysic[key].value.charAt(0))
        }

        let idealForRooms = [];
        const roomForIdeal = document.getElementsByName('roomForIdeal');
        for (let key in this.state.rooms) {
            idealForRooms.push(roomForIdeal[key].value)
        }

        this.props.handleRooms(true, this.state.rooms, circuitForRooms, physicForRooms, idealForRooms);
    }

    render() {

        // Printing the list of rooms
        const toShow = this.state.rooms.map(room => {
            return (
                <li>
                    <div className={styles.Label}>
                        <label for={room['name']} className={styles.Label}> <span>{room['name']} </span></label>
                    </div>
                    {/* DROPDOWN FOR CIRCUITS*/}
                    <div className={styles.Select1}>
                        <select id={room['name']} name="roomForCircuits" >
                            return <option value="none"> None </option>
                            {this.state.circuits.map(circuit => {
                                return <option value={circuit}> {circuit} </option>
                            })}
                        </select>
                    </div>
                    <div className={styles.Select1}>
                        {/* DROPDOWN FOR PHYSIC*/}
                        <select id={room['name']} name="roomForPhysic">
                            {PhysicList.map(physic => {
                                return <option value={Object.keys(physic)[1]}> {Object.keys(physic)[0]} </option>
                            })}
                        </select>
                    </div>
                    <div className={styles.Select2}>
                        {/* INPUT FOR IDEAL PHYSICS*/}
                        <label for="roomForIdeal"> Grandeur idéale </label>
                        <input type="number" id={room['name']} name="roomForIdeal" min="-10" max="30" step ="1"/>
                    </div>
                </li>
            )
        })

        return (
            <div className={styles.Rooms}>
                <h1> Paramétrages des Pièces</h1>
                <form onSubmit={this.handleSubmit}>
                    {toShow}
                </form>
                <button type="submit" onClick={this.handleSubmit}>Suivant</button>
            </div>
        )

    }
}

export default Rooms;
