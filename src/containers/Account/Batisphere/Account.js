import React, { Component } from "react";

import Logout from "../../../components/MyAccount/Logout/Logout";
import MyAccount from "../../../components/MyAccount/MyAccount";

import AccountLayout from "../../../hoc/AccountLayout/Layout";
// import ListCustomers from "./Actions/ListCustomers/ListCustomers";
// import EditUsers from "./Actions/EditUsers/EditUsers";
// import ListUsers from "./Actions/ListUsers/ListUsers";

// Page affichée lorsqu'on est connecté en tant qu'admin
class Account extends Component {
    state= {
        loading: true
    }

    render() {

        let compToShow = null;

        if(this.props.spec1 === "users") {
            if(this.props.spec2 === "list"){
                // compToShow = <ListUsers spec={this.props.spec2}/>
            }

            if(this.props.spec2 === "edit"){
                // compToShow = <EditUsers spec={this.props.spec2}/>
            }
        }

        if(this.props.spec1 === "customer") {
            if(this.props.spec2 === "list"){
               // compToShow = <ListCustomers spec={this.props.spec2} />
            }
        }

        return (
            <AccountLayout>
                <MyAccount mode="batisphere"/>
                {compToShow}
                <Logout loginOut={this.props.login}/>
            </AccountLayout>
        );
    }
}

export default Account;