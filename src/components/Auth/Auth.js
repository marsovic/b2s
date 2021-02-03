import React, { Component } from "react";
import axios from 'axios';
import crypto from "crypto";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import styles from "./Auth.module.css";
import Spinner from "../UI/Spinner/Spinner";

class AuthOthers extends Component {
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

        //lancement Spinnner
        this.setState({ loading: true });

        // Separation du 'admin' de '[nom]@admin.com'
        const userMode = this.state.controls.userName.value.split("@")[1].slice(0, -4);
        // Requete de connexion

        let user = null;

        let url = "";
        if (this.props.mode === "connection") {
            url = "https://parseapi.back4app.com/login";
            user = {
                username: this.state.controls.userName.value.split("@")[0],
                password: crypto.createHash('sha1').update(this.state.controls.password.value).digest('hex'),
            }
        }

        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key":  process.env.REACT_APP_API_KEY,
                // "X-Parse-Revocable-Session": 1,
                "Content-Type": "application/json",
            }
        };

        axios
            .post(url, user, options)
            .then((res) => {
                sessionStorage.setItem("isUserLogged", true);
                sessionStorage.setItem("token", res.data.sessionToken);
                sessionStorage.setItem("objectId", res.data.objectId);

                this.setState({ loading: false, errorMessage: "" });
                this.props.login(true, userMode);
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
                this.setState({ errorMessage: "Email ou mot de passe invalide" });
                this.props.login(false, userMode);
            });
        
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

        const form = formElementsArray.map(formElement =>  (
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
                    <div>
                        <p style={{textTransform: "capitalize"}}> Connexion </p>
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

export default AuthOthers;