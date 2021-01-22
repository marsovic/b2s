import React, { Component } from "react";

import Logout from "../../../components/MyAccount/Logout/Logout";
import MyAccount from "../../../components/MyAccount/MyAccount";
import Chart1 from "./Charts/Chart1"
import Advices from "./Advices/Advices";

// Page affichée lorsqu'on est connecté  en tant que client
class Account extends Component {
    render() {
        return (
            <div style={{paddingTop: "52px"}}>
                <MyAccount mode={this.props.mode}/>
                <Advices />
                <Chart1 />
                <Logout loginOut={this.props.login}/>
            </div>
        );
    }
}

export default Account;