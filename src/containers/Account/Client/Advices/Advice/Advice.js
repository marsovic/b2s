import React, { Component } from "react";

import style from "./Advice.module.css"
class Advice extends Component {

    render() {
        return(
            <div className={style.Advice}>
            <p> {this.props.advice} </p>
            </div>
        )
    }
}

export default Advice;