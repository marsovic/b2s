import React, { Component } from "react";
import axios from "axios";

import Aux from "../../../../../../hoc/Aux/Aux"
import Spinner from "../../../../../../components/UI/Spinner/Spinner"
import FormCircuit from "../../../../../../components/FormCircuits/FormCircuits";
import ListAdvices from "../../../Advices/ListAdvices"

class Customer extends Component {
    state = {
        user: window.location.pathname.split("/").slice(-1)[0],
        userData: null,    // JSON contenant les infos de l'utilisateur séléctionné de BDD
        userAdvices: null, // JSON des conseils
        userSchema: null,  // JSON des relations circuits/salles
        listRooms: null,   // Liste des pieces venant du ProcessingCSV
        listColumns: null, // Liste des colonnes venant du ProcessingCSV
        openDays: null,
        workingHours: null,
        rawFile: null,
        loading: true,
        message: null
    }

    componentDidMount() {
        let url = "https://parseapi.back4app.com/users";
        let actualUser = null;

        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
                "X-Parse-Revocable-Session": 1,
                "Content-Type": "application/json",
            }
        };

        // Récupération des données de l'utilisteur dans la base de donnée
        axios
            .get(url, options)
            .then((res) => {
                res.data.results.map(user => {
                    if (user.username.replaceAll(" ", "") === this.state.user) {
                        actualUser = user;

                        if (actualUser.data !== undefined && actualUser.data.trim() !== "") {
                            // Récupération des données pour la liste des pièces
                            this.setState({ listRooms: JSON.parse(actualUser.data) })
                        }

                        if (actualUser.columns !== undefined && actualUser.columns.trim() !== "") {
                            // Récupération des données pour la liste des colonnes
                            this.setState({ listColumns: JSON.parse(actualUser.columns) })
                        }
                        
                        if (actualUser.schema !== undefined && actualUser.schema.trim() !== "") {
                            // Récupération des données pour la liste des colonnes
                            this.setState({ userSchema: JSON.parse(actualUser.schema) })
                        }

                        if (actualUser.advices !== undefined && actualUser.advices.trim() !== "") {
                            // Récupération des données pour la liste des colonnes
                            this.setState({ userAdvices: JSON.parse(actualUser.advices) })
                        }

                        if (actualUser.hours !== undefined && actualUser.hours.trim() !== "") {
                            // Récupération des données pour la liste des colonnes
                            this.setState({ workingHours: JSON.parse(actualUser.hours) })
                        }

                        if (actualUser.days !== undefined && actualUser.days.trim() !== "") {
                            // Récupération des données pour la liste des colonnes
                            this.setState({ openDays: JSON.parse(actualUser.days) })
                        }
                    }
                    return null;
                });

                this.setState({ userData: actualUser, loading: false })
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });

        if (this.state.userSchema === null) {
            this.handleDataUser(this.state.userSchema, this.state.rawFile);
        }
    }

    handleSchema = (newSchema, dataFile, days, hours) => {
        this.setState({
            userSchema: newSchema,
            rawFile: dataFile,
            openDays: days,
            workingHours: hours
        });

        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
                "X-Parse-Session-Token": sessionStorage.getItem("token")
            }
        };

        let url = "https://parseapi.back4app.com/users/" + this.state.userData.objectId;

        const updatedUser = {
            "schema": JSON.stringify(newSchema)
        }

        this.handleDataUser(newSchema, dataFile, days, hours);

        axios
            .put(url, updatedUser, options)
            .then((res) => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
    }

    handleDataUser = (schema, file, days, hours) => {
        this.setState({ loading: true, message: "Calcul des conseils" })

        const formData = new FormData();

        formData.append("dataSchema", JSON.stringify(schema));
        formData.append("openDays", JSON.stringify(days));
        formData.append("workingHours", JSON.stringify(hours));
        formData.append("file", file);

        axios
            .post("/api/upload", formData)
            .then(res => {
                // Enregistrement en BDD des infos
                const options = {
                    headers: {
                        "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                        "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
                        "X-Parse-Session-Token": sessionStorage.getItem("token")
                    }
                };

                let url = "https://parseapi.back4app.com/users/" + this.state.userData.objectId;

                const updatedUser = {
                    "advices": res.data.advices,
                    "days": JSON.stringify(days),
                    "hours": JSON.stringify(hours)
                }


                axios
                    .put(url, updatedUser, options)
                    .then((res) => {
                        console.log(res)
                        this.setState({ userAdvices: JSON.parse(res.data.advices),  loading: false, message: null });
                    })
                    .catch((err) => {
                        console.log(err)
                        this.setState({ userAdvices: JSON.parse(res.data.advices),  loading: false, message: null });
                    });
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleErasingData = () => {
        this.setState({ loading: true });

        // Enregistrement en BDD des infos
        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
                "X-Parse-Session-Token": sessionStorage.getItem("token")
            }
        };

        let url = "https://parseapi.back4app.com/users/" + this.state.userData.objectId;

        const updatedUser = {
            "advices": "",
            "schema": "",
            "data": "",
            "columns": ""
        }


        axios
            .put(url, updatedUser, options)
            .then((res) => {
                console.log(res)
                this.setState({
                    loading: false,
                    userAdvices: undefined,
                    userSchema: undefined,
                    listColumns: undefined,
                    listRooms: undefined,
                    message: undefined,
                    openDays: undefined,
                    workingHours: undefined,
                    rawFile: undefined
                });
            })
            .catch((err) => {
                console.log(err)
                this.setState({ loading: false, message: null });
            });


    }


    render() {
        let toShow = null;
        let fileToShow = null;

        if (this.state.loading) {
            toShow = <Spinner message={this.state.message} />
        } else {
            if (this.state.userData !== null) // L'utilisateur possède déja des données, on affiche juste ce qui existe
            {
                if (this.state.userData.data !== undefined && this.state.userData.data.trim() !== "") {
                    if (this.state.userSchema === null) {
                        toShow =
                            <div>
                                <FormCircuit userId={this.state.userData.objectId} handleSchema={this.handleSchema} />
                            </div>
                    } else {
                        /* L'utilisateur a déjà rempli les infos concernant les circuits, on :
                            - calcul les conseils.
                            - sauvegarde les données en BDD.
                        */
                        toShow =
                            <div>
                                <button onClick={this.handleErasingData}>Suppression des données en mémoire</button>
                                <ListAdvices advices={this.state.userAdvices} schema={this.state.userSchema} fullData={this.state.listColumns} listColumns={this.state.listRooms} />
                            </div>
                    }
                }
                else {
                    toShow = (<FormCircuit userId={this.state.userData.objectId} handleSchema={this.handleSchema} />)
                }
            } else {
                toShow = <button onClick={this.handleErasingData}>Suppression des données en mémoire</button>
            }
        }


        return (
            <Aux >
                {toShow}
                {fileToShow}
            </Aux>
        )
    }
}

export default Customer;