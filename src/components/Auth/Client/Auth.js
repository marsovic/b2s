import React, { Component } from "react";
import axios from 'axios';

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from "../Auth.module.css";
import Spinner from "../../UI/Spinner/Spinner";

class AuthClient extends Component {
    state = {
        controls: {
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'userName',
                    placeholder: "Nom d'utilisateur"
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Mot de passe'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        errorMessage: ""
    }

    getDataFire = (event) => {

        // Interdire le rechargement de la page 
        event.preventDefault();

        // Propre à firebase ces 3 paramètres
        const authData = {
            email: this.state.controls.userName.value.concat("@client.com"),
            password: this.state.controls.password.value,
            returnSecureToken: true
        }

        //lancement Spinnner
        this.setState({ loading: true });

        // Separation du 'client' de '[nom]@client.com'
        const userMode = authData.email.split("@")[1].slice(0, -4);
        // Requete de connexion

        // Props définissant si connexion ou inscription
        let url = "";
        if(this.props.mode === "connection") {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        }

        if(this.props.mode === "signIn") {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        }

        axios.post(url + "AIzaSyBIdwOfPXkIPi0gfzsxxQJXuy9iGUGncoI", authData)
            .then(res => {
                console.log(res);
                sessionStorage.setItem("isUserLogged", true);
                sessionStorage.setItem("token", res.data.idToken);
                sessionStorage.setItem("localId", res.data.localId);

                this.setState({ loading: false, errorMessage: "" });
                this.props.login(true, userMode);
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
                this.setState({ errorMessage: "Email ou mot de passe invalide" });
                this.props.login(false, userMode);
            })
        
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName]),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    // Validité des parametres
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))

        let mode = "";

        if(this.props.mode === "connection") {
            mode = "Connexion"
        } else {
            mode = "Inscription"
        }

        return (
            <div className={styles.Auth}>
                {
                    this.state.loading ? <Spinner /> :
                    <div>
                        <p style={{textTransform: "capitalize"}}> {mode} </p>
                        <form onSubmit={this.getDataFire}>
                            {form}
                            <p style={{ color: "red" }}><strong>{this.state.errorMessage}</strong></p>
                            <Button btnType="Success">Se connecter</Button>
                        </form>
                    </div>
                }
            </div>
        )

    }
}

export default AuthClient;