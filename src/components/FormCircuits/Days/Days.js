import React, { Component } from "react";

import styles from "./Days.module.css"


class Days extends Component {
    state = {
        daysOff: null,
        openHours: null,
        loading: true,
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let openHours = [];
        const FormOpenHours = document.getElementsByName('openHours');
        openHours.push(FormOpenHours[0].value.concat(":00"))
        openHours.push(FormOpenHours[1].value.concat(":00"))

        let daysOFf = [];
        const FormDaysOFf = document.getElementsByName('daysOFf');
        for (let key = 0; key < 7; key++) {
            if(FormDaysOFf[key].checked !== null) {
                daysOFf.push(FormDaysOFf[key].checked)
            }
        }

        this.props.handleDays(daysOFf, openHours);
    }

    render() {

        return (
            <div className={styles.Days}>
                <form onSubmit={this.handleSubmit}>

                    <div class={styles.weekDays}>
                    <h1> Sélection des jours ouvrés </h1>
                        <input type="checkbox" name="daysOFf" id="weekday-mon" class="weekday" />
                        <label for="weekday-mon">L</label>
                        <input type="checkbox" name="daysOFf" id="weekday-tue" class="weekday" />
                        <label for="weekday-tue">M</label>
                        <input type="checkbox" name="daysOFf" id="weekday-wed" class="weekday" />
                        <label for="weekday-wed">M</label>
                        <input type="checkbox" name="daysOFf" id="weekday-thu" class="weekday" />
                        <label for="weekday-thu">J</label>
                        <input type="checkbox" name="daysOFf" id="weekday-fri" class="weekday" />
                        <label for="weekday-fri">V</label>
                        <input type="checkbox" name="daysOFf" id="weekday-sat" class="weekday" />
                        <label for="weekday-sat">S</label>
                        <input type="checkbox" name="daysOFf" id="weekday-sun" class="weekday" />
                        <label for="weekday-sun">D</label>
                    </div>
                    
                    <div class={styles.hours}>
                    <h1> Sélection des horaires d'ouverture </h1>
                        <div className={styles.clocks}>
                            <label for="open">Heure d'ouverture </label>
                            <input type="time" id="open" name="openHours" required />
                        </div>
                        <div className={styles.clocks}>
                            <label for="close">Heure de fermeture </label>
                            <input type="time" id="close" name="openHours" required />
                        </div>
                    </div>

                </form>
                <button type="submit" onClick={this.handleSubmit}>Suivant</button>
            </div>
        )

    }
}

export default Days;
