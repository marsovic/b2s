import React, { Component } from "react";

import Logout from "../../components/MyAccount/Logout/Logout";
import MyAccount from "../../components/MyAccount/MyAccount";

// Page affichée lorsqu'on est connecté
class Account extends Component {
    render() {
        return (
            <div>
                <MyAccount />
                <Logout loginOut={this.props.login}/>
            </div>
        );
    }
}

export default Account;