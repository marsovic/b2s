import React, { Component } from "react";

import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import styles from "./Circuits.module.css"


class Circuits extends Component {
    state = {
        circuits: this.props.rooms,
        loading: true,
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let checkedValue = [];
        const rooms = document.getElementsByName('room');
        for(let key in rooms) {
            if(rooms[key].checked) {
                checkedValue.push(rooms[key].value)
            }
        }

        this.props.handleCircuits(true, checkedValue);
    }

    render() {
        const toShow = this.props.rooms.map(room => {
            return (
                <li>
                    <input name="room" type="checkbox" id={room['name']} value={room['name']} />
                    <label for={room['name']}>{room['name']}</label>
                </li>
            )
        })

        return (
            <div className={styles.Circuits}>
                <h1> Sélection des Circuits principaux parmis les pièces</h1>
                <form onSubmit={this.handleSubmit}>
                {toShow}
                </form>
                <button type="submit" onClick={this.handleSubmit}>Suivant</button>
            </div>
        )

    }
}

export default Circuits;
