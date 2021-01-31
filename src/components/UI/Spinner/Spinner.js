import React, { Component } from 'react';
import styles from "./Spinner.module.css";

class Spinner extends Component {
    render() {
        return(
            <div className={styles.ldsHourglass}>{this.props.message}</div>
        )
    }
}

export default Spinner;