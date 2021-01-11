import React, { Component } from "react";
import axios from 'axios';

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import styles from "./Auth.module.css";
import Spinner from "../UI/Spinner/Spinner";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Adresse mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
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
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true
        }

        //lancement Spinnner
        this.setState({ loading: true });

        // Requete de connexion
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDphOaprVVu7Ji_g_UYD4A5so1Y4n-qZnk", authData)
            .then(res => {
                console.log(res);
                sessionStorage.setItem("isUserLogged", true);
                sessionStorage.setItem("token", res.data.idToken);
                sessionStorage.setItem("localId", res.data.localId);

                this.setState({ loading: false, errorMessage: "" });
                this.props.login(true);
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
                this.setState({ errorMessage: "Email ou mot de passe invalide" });
                this.props.login(false);
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

        return (
            <div className={styles.Auth}>
                {
                    this.state.loading ? <Spinner /> :
                        <form onSubmit={this.getDataFire}>
                            {form}
                            <p style={{ color: "red" }}><strong>{this.state.errorMessage}</strong></p>
                            <Button btnType="Success">Se connecter</Button>
                        </form>
                }
            </div>
        )

    }
}

export default Auth;