import React, { Component } from "react";
import axios from 'axios';
import crypto from "crypto";

import Input from "../../../../../../components/UI/Input/Input"
import Button from "../../../../../../components/UI/Button/Button"

class AddUser extends Component {

    state = {
        orderForm: {
            username: {
                elementType: "input",
                elementConfig: {
                    type: "userName",
                    placeholder: "Nom d'utilisateur",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "street",
                    placeholder: "Rue",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            city: {
                elementType: "input",
                elementConfig: {
                    type: "city",
                    placeholder: "Ville",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            right: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'client', displayValue: 'Client' },
                        { value: 'batisphere', displayValue: 'Batisphere' },
                        { value: 'admin', displayValue: 'Administrateur' }
                    ]
                },
                value: 'client',
                validation: {},
                valid: true
            },
            RAE: {
                elementType: "input",
                elementConfig: {
                    type: "RAE",
                    placeholder: "RAE",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            compteur: {
                elementType: "input",
                elementConfig: {
                    type: "compteur",
                    placeholder: "N° de compteur",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            }
        },
        loading: true,
        modify: false,
        errorMessage: "",
        successMessage: "",
        formIsValid: false,
        canBedAdded: false
    }

    requestAdd = (event) => {
        event.preventDefault();

        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
                "X-Parse-Session-Token": sessionStorage.getItem("token")
            }
        };

        const url = "https://parseapi.back4app.com/users";
        const user = {
            username: this.state.orderForm.username.value,
            email: this.state.orderForm.username.value.concat("@", this.state.orderForm.right.value, ".fr"),
            street: this.state.orderForm.street.value,
            city: this.state.orderForm.city.value,
            password: crypto.createHash('sha1').update(this.state.orderForm.username.value).digest('hex'),
            right: this.state.orderForm.right.value
        }

        if (this.checkUnicity(user.username) === true && this.state.formIsValid === true) {

            // Requete de création de compte
            axios
                .post(url, user, options)
                .then((res) => {
                    this.setState({
                        loading: false,
                        errorMessage: "",
                        successMessage: "Utilisateur crée avec succès"
                    });
                })
                .catch((err) => {
                    this.setState({
                        loading: false,
                        errorMessage: "Echec. ".concat(err.response.data.error),
                        successMessage: ""
                    });
                });

            // Requete de changement de mot de passe
            if (this.state.errorMessage.trim() === "") {
                let urlToResetPassword = "https://parseapi.back4app.com/requestPasswordReset"
                const userEmail = {
                    "email" : user.email
                }
                axios
                    .post(urlToResetPassword, userEmail , options)
                    .then((res) => {
                        this.setState({
                            loading: false,
                            errorMessage: "",
                            successMessage: "Utilisateur crée avec succès"
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            loading: false,
                            errorMessage: "Echec.".concat(err.response.data.error),
                            successMessage: ""
                        });
                    });
            }
        }
    }

    checkUnicity(username) {
        let valid = true;
        let listUser = null;

        const url = "https://parseapi.back4app.com/users";
        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
                "X-Parse-Revocable-Session": 1,
                "Content-Type": "application/json",
            }
        };

        axios
            .get(url, options)
            .then((res) => {
                listUser = res.data.results;
                for (let elem in listUser) {
                    valid = username !== listUser[elem].username && valid
                }
                this.setState({ loading: false });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });

        return valid;
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        if(updatedOrderForm["right"].value === "client") {
            updatedOrderForm["RAE"].validation.required = true;
            updatedOrderForm["compteur"].validation.required = true;
        } else {
            updatedOrderForm["RAE"].validation.required = false;
            updatedOrderForm["compteur"].validation.required = false;

            updatedOrderForm["RAE"].valid = true;
            updatedOrderForm["compteur"].valid = true;
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <div>
                <h2> Ajout d'un utilisateur</h2>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                <div>
                    <div> {this.state.errorMessage}</div>
                    <div style={{ color: "green" }}> {this.state.successMessage}</div>
                </div>

                <Button
                    btnType="Success"
                    value="Submit"
                    disabled={!this.state.formIsValid}
                    clicked={this.requestAdd}> Création </Button>
            </div>
        );


        return (
            <div >
                {form}
            </div>
        )
    }
}

export default AddUser;