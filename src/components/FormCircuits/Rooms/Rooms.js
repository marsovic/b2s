import React, { Component } from "react";

import styles from "./Rooms.module.css"


const PhysicList = [
    { "Temperature": "T" }
]

class Rooms extends Component {
    state = {
        circuits: this.props.circuits,
        rooms: this.props.rooms,
        loading: true,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Deleting Selectionned circuits from the list of rooms
        var roomsWithoutCircuit = this.state.rooms;
        var toDelete = [];

        for (let room in this.state.rooms) {
            for (let elem in this.state.circuits) {
                if (this.state.circuits[elem] === roomsWithoutCircuit[room].name) {
                    toDelete.push(room)
                }
            }
        }

        for (let roomToDelete in toDelete.reverse()) {
            roomsWithoutCircuit.splice(toDelete[roomToDelete], 1);
        }

        let circuitForRooms = [];
        const roomsOnPageCircuit = document.getElementsByName('roomForCircuits');
        for (let key in this.state.rooms) {
            circuitForRooms.push(roomsOnPageCircuit[key].value)
        }

        let physicForRooms = [];
        const roomsOnPageCPhysic = document.getElementsByName('roomForPhysic');
        for (let key in this.state.rooms) {
            physicForRooms.push(roomsOnPageCPhysic[key].value.charAt(0))
        }

        this.props.handleRooms(true, roomsWithoutCircuit, circuitForRooms, physicForRooms);
    }

    render() {

        // Deleting Selectionned circuits from the list of rooms
        var roomsWithoutCircuit = this.state.rooms;
        var toDelete = [];

        for (let room in this.state.rooms) {
            for (let elem in this.state.circuits) {
                if (this.state.circuits[elem] === roomsWithoutCircuit[room].name) {
                    toDelete.push(room)
                }
            }
        }

        for (let roomToDelete in toDelete.reverse()) {
            roomsWithoutCircuit.splice(toDelete[roomToDelete], 1);
        }

        // Printing the list of rooms
        const toShow = roomsWithoutCircuit.map(room => {
            return (
                <li>
                    <div className={styles.Label}>
                        <label for={room['name']} className={styles.Label}> <span>{room['name']} </span></label>
                    </div>
                    {/* DROPDOWN FOR CIRCUITS*/}
                    <div className={styles.Select1}>
                        <select id={room['name']} name="roomForCircuits" >
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