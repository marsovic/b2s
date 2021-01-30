import React, { Component } from "react";

import Aux from "../../../../../../hoc/Aux/Aux"

class Customer extends Component {
    state = {
        user: window.location.pathname.split("/").slice(-1)[0]
    }

    render() {
        return (
            <Aux >
                <p>Yolo ! c'est le client {this.state.user}</p>
            </Aux>
        )
    }
}

export default Customer;