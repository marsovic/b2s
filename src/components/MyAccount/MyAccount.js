import React, { Component } from "react";

import Toolbar from "../Navigation/AccountToolbar/Toolbar";

class MyAccount extends Component {
    render() {
        return (
            <div>
                <Toolbar mode={this.props.mode} />
            </div>
        );
    }
}

export default MyAccount;
