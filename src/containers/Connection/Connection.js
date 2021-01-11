import React, { Component } from "react";

import Auth from "../../components/Auth/Auth";
import MyAccount from "../../components/MyAccount/myAccount";


class Connection extends Component {
    state= {
        isUserLogged: false,
        authData: {
            email: "",
            password: ""
        },
        errorMessage: ""
    }

    // Verification à chaque render du stockage de session
    componentWillMount() {
        this.setState({isUserLogged: sessionStorage.getItem("isUserLogged") });
    }

    loggedHandler = (loginState) => {
        this.setState({isUserLogged: loginState})
    }

    render() {
        return (
            <div>
                {
                    this.state.isUserLogged? 
                        <MyAccount /> :
                        <Auth login={this.loggedHandler} />
                }
            </div>
        );
    }
}

export default Connection;