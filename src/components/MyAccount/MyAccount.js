import React, { Component } from "react";

import Toolbar from "../Navigation/AccountToolbar/Toolbar";

class MyAccount extends Component {
    render() {
        return (
            <div>
                <Toolbar mode={this.props.mode} />
                <p>
                    T'es connecté en <strong>{this.props.mode}</strong>  ! 
                </p>
            </div>
        );
    }
}

export default MyAccount;
