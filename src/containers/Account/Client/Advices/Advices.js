import React, { Component } from "react";

import style from "./Advices.module.css"
import Aux from "../../../../hoc/Aux/Aux"
import Advice from "./Advice/Advice";

class Advices extends Component {

    render() {
        return(
            <div className={style.Advices}>
                <h2> Conseils </h2>
                <Advice advice="- fais ci" />
                <Advice advice="- fais ça" />
            </div>
        )
    }
}

export default Advices;