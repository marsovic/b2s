import React, { Component } from "react";

import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import styles from "./Rooms.module.css"


class Rooms extends Component {
    state = {
        circuits: this.props.circuits,
        rooms: this.props.rooms,
        loading: true,
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let checkedValue = [];
        const rooms = document.getElementsByName('room');
        for (let key in rooms) {
            if (rooms[key].checked) {
                checkedValue.push(rooms[key].value)
            }
        }

        this.props.handleCircuits(true, checkedValue);
    }

    render() {

        // Deleting Selectionned circuits from the list of rooms
        var roomsWithoutCircuit = this.state.rooms;
        var toDelete = [];

        for (let room in this.state.rooms) {
            for (let elem in this.state.circuits) {
                if(this.state.circuits[elem] === roomsWithoutCircuit[room].name){
                    toDelete.push(room)
                }
            }
        }

        for(let roomToDelete in toDelete.reverse()) {
            roomsWithoutCircuit.splice(toDelete[roomToDelete], 1);
        }

        // Printing the list of rooms
        const toShow = roomsWithoutCircuit.map(room => {
            return (
                <li>
                    <label for={room['name']}>{room['name']}</label>
                    {/* DROPDOWN */}
                    <select id={room['name']} name={room['name']}> 
                        {this.state.circuits.map(circuit =>{
                            return <option value={circuit}> {circuit}</option>
                        } )}
                    </select>
                </li>
            )
        })

        return (
            <div className={styles.Circuits}>
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
