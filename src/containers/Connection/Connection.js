import React, { Component } from "react";
import axios from 'axios';

import AuthClient from "../../components/Auth/Client/Auth";
import AuthOthers from "../../components/Auth/Others/Auth";
import AccountClient from "../Account/Client/Account";
import AccountAdmin from "../Account/Admin/Account";
import AccountBatisphere from "../Account/Batisphere/Account";
import Spinner from "../../components/UI/Spinner/Spinner";


class Connection extends Component {
    state = {
        isUserLogged: false,
        authData: {
            email: "",
            password: ""
        },
        errorMessage: "",
        mode: "",
        loading: false
    }

    // Verification à chaque render du stockage de session
    componentWillMount() {
        this.setState({ isUserLogged: Boolean(sessionStorage.getItem("isUserLogged")) });

    }

    loggedHandler = (loginState, userMode) => {
        this.setState({ isUserLogged: Boolean(loginState), mode: userMode })

    }

    componentDidMount() {
        console.log(sessionStorage.getItem("token"))

        if (sessionStorage.getItem("token") !== null) {
            // this.setState({ loading: true });

            const userData = {
                idToken: sessionStorage.getItem("token")
            }

            let url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=";
            axios.post(url + "AIzaSyBIdwOfPXkIPi0gfzsxxQJXuy9iGUGncoI", userData)
                .then(res => {
                    this.setState({ loading: false });;
                    this.setState({ mode: res.data.users[0].email.split("@")[1].slice(0, -4) })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loading: false });;
                })
        } else {
            console.log("coucou");
            this.setState({mode:"", isUserLogged: false, loading: false})
        }
    }

    render() {
        if (this.state.loading === false) {
            // Recuperation de la premiere valeur dans l'URL apres le /
            let pathArray = window.location.pathname.split('/');
            let secondLevelLocation = pathArray[1];

            let containerShowed = null;
            console.log(this.state.mode);

            if (this.state.isUserLogged === true) {
                if (this.state.mode === "client" && secondLevelLocation === "home") {
                    containerShowed =
                        <AccountClient
                            mode={this.state.mode}
                            login={this.loggedHandler} />;
                }

                if (this.state.mode === "admin" && secondLevelLocation === "internal") {
                    containerShowed =
                        <AccountAdmin
                            mode={this.state.mode}
                            login={this.loggedHandler} />;
                }

                if (this.state.mode === "batisphere" && secondLevelLocation === "internal") {
                    containerShowed =
                        <AccountBatisphere
                            mode={this.state.mode}
                            login={this.loggedHandler} />;
                }
            }
            else {
                if (secondLevelLocation === "home") {
                    containerShowed = <div>
                        <AuthClient login={this.loggedHandler} mode="connection" />
                        <AuthClient login={this.loggedHandler} mode="signIn" />
                    </div>
                }

                if (secondLevelLocation === "internal") {
                    containerShowed = <div>
                        <AuthOthers login={this.loggedHandler} mode="connection" />
                        <AuthOthers login={this.loggedHandler} mode="signIn" />
                    </div>
                }

            }

            if (containerShowed === null) {
                containerShowed = <p>Erreur. Retournez à la page d'accueil.</p>
            }

            return (
                <div>
                    {containerShowed}
                </div>
            );
        } else {

            return (
                <div>
                    <Spinner />
                </div>
            );
        }
    }
}

export default Connection;