import React, { Component } from "react";
import CSV from '../../../components/CSV/processingCSV'
import Logout from "../../../components/MyAccount/Logout/Logout";
import MyAccount from "../../../components/MyAccount/MyAccount";
import Chart1 from "./Charts/Chart1"
import Advices from "./Advices/Advices";

// Page affichée lorsqu'on est connecté  en tant que client
class Account extends Component {
    baba(data1, data2) {
        console.log(data1); // Show the names of the columns
        console.log(data2); // Show data on each row 
    }

    render() {
        return (
            <div style={{paddingTop: "52px"}}>
                <CSV sendJSON={this.baba}/>
                <MyAccount mode={this.props.mode}/>
                <Advices />
                <Chart1 />
                <Logout loginOut={this.props.login}/>
            </div>
        );
    }
}

export default Account;