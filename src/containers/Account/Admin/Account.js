import React, { Component } from "react";

import Logout from "../../../components/MyAccount/Logout/Logout";
import MyAccount from "../../../components/MyAccount/MyAccount";
import Spinner from "../../../components/UI/Spinner/Spinner";
import AccountLayout from "../../../hoc/AccountLayout/Layout";
import ListCustomers from "./Actions/ListUsers/Users";

// Page affichée lorsqu'on est connecté en tant qu'admin
class Account extends Component {
    state= {
        loading: true
    }


    render() {
        return (
            <AccountLayout>
                <MyAccount mode="admin"/>
                <ListCustomers />
                <Logout loginOut={this.props.login}/>
            </AccountLayout>
        );
    }
}

export default Account;