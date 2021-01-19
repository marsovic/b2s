import React, { Component } from "react";
import axios from 'axios';

import Input from "../../../../../../components/UI/Input/Input"
import Button from "../../../../../../components/UI/Button/Button"

class EditUsers extends Component {

    state = {
        userId: (this.props.user === null) ? "" : this.props.user.objectId,
        orderForm: {
            username: {
                elementType: "input",
                elementConfig: {
                    type: "userName",
                    placeholder: "Nom d'utilisateur",
                },
                value: (this.props.user === null) ? "" : this.props.user.username,
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "street",
                    placeholder: "Rue",
                },
                value: (this.props.user === null) ? "" : this.props.user.street,
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
            },
            city: {
                elementType: "input",
                elementConfig: {
                    type: "city",
                    placeholder: "Ville",
                },
                value: (this.props.user === null) ? "" : this.props.user.city,
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
            },
        },
        loading: true,
        modify: false,
        errorMessage: "",
        successMessage: "",
        formIsValid: true
    }

    saveChanges = () => {
        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
                "X-Parse-Session-Token": sessionStorage.getItem("token")
            }
        };

        let url = "https://parseapi.back4app.com/users/" + this.state.userId;

        const updatedUser = {
            "username": this.state.orderForm.username.value,
            "street": this.state.orderForm.street.value,
            "city": this.state.orderForm.city.value
        }
        
        axios
            .put(url, updatedUser ,options)
            .then((res) => {
                this.setState({ 
                    oading: false, 
                    errorMessage: "",
                    successMessage:" Utilisateur mis à jour avec succès" });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
                this.setState({ 
                    errorMessage: "Erreur dans un des champs",
                    successMessage:"" });
            });
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
                <h2> Fiche utilisateur </h2>
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
                    <div style={{color:"green"}}> {this.state.successMessage}</div>
                </div>

                <Button
                    btnType="Success"
                    value="Submit"
                    disabled={!this.state.formIsValid}
                    clicked={this.saveChanges}> Sauvegarder </Button>
            </div>
        );


        return (
            <div >
                {form}
            </div>
        )
    }
}

export default EditUsers;