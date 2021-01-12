import React, { Component } from "react";

import Auth from "../../components/Auth/Auth";
import Account from "../Account/Account";


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
        console.log(this.state.isUserLogged)

    }

    render() {
      
        if(this.state.isUserLogged === true){
            return (
                <div>
                    {
                        <Account login={this.loggedHandler}/> 
                    }
                </div>
            );

        }
        else{
            return (
                <div>
                    {
                        <div>
                            <Auth login={this.loggedHandler} mode="connection" />
                            <Auth login={this.loggedHandler} mode="signIn" /> 
                        </div>
                    }
                </div>
            );
        }
        
    }
}

export default Connection;