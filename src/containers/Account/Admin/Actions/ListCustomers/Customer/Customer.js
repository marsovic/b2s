import React, { Component } from "react";
import axios from "axios";

import Aux from "../../../../../../hoc/Aux/Aux"
import Spinner from "../../../../../../components/UI/Spinner/Spinner"
import FormCircuit from "../../../../../../components/FormCircuits/FormCircuits";


class Customer extends Component {
    state = {
        user: window.location.pathname.split("/").slice(-1)[0],
        userData: null,    // JSON contenant les infos de l'utilisateur séléctionné de BDD
        userAdvices: null, // JSON des conseils
        userSchema: null,  // JSON des relations circuits/salles
        listRooms: null,   // Liste des pieces venant du ProcessingCSV
        listColumns: null, // Liste des colonnes venant du ProcessingCSV
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
                    if (user.username === this.state.user) {
                        actualUser = user;

                        if (actualUser.data !== undefined && actualUser.data.trim() !== ""  ) {
                            // Récupération des données pour la liste des pièces
                            this.setState({ listRooms: JSON.parse(actualUser.data) })
                        }

                        if (actualUser.columns !== undefined && actualUser.columns.trim() !== "") {
                            // Récupération des données pour la liste des colonnes
                            this.setState({ listColumns: JSON.parse(actualUser.columns) })
                        }
                        
                        if (actualUser.userSchema !== undefined && actualUser.userSchema.trim() !== "") {
                            // Récupération des données pour la liste des colonnes
                            this.setState({ userSchema:JSON.parse(actualUser.schema) })
                        }

                        if (actualUser.advices !== undefined && actualUser.advices.trim() !== "") {
                            // Récupération des données pour la liste des colonnes
                            this.setState({ userAdvices:JSON.parse(actualUser.advices) })
                        }
                    }
                    return null;
                });


                console.log(this.state.userAdvices)
                this.setState({ userData: actualUser, loading: false })
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
            console.log(this.state.userSchema)
        if (this.state.userSchema === null) {
            this.handleDataUser();
        }
    }

    handleSchema = (newSchema) => {
        this.setState({ userSchema: newSchema });

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

        axios
            .put(url, updatedUser, options)
            .then((res) => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
    }

    handleDataUser = () => {
        console.log(this.state.loading)
        this.setState({ loading: true, message: "Calcul des conseils" })

        fetch('/time')
            .then(res => res.json())
            .then(data => {
                console.log("yolo", JSON.parse(data.time) )
                this.setState({userAdvices: JSON.parse(data.time) })
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
                    "advices": data.time
                }
        
                axios
                    .put(url, updatedUser, options)
                    .then((res) => {
                        this.setState({ loading: false, message: null });
                    })
                    .catch((err) => {
                        this.setState({ loading: false, message: null });
                    });
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
                if (this.state.userData.data !== undefined && this.state.userData.data.trim() !== "") 
                { /* ----------------------------> LOUIS <---------------------------- */
                    toShow =
                        <div>
                            <p>Yolo ! c'est le client {this.state.user}</p>
                            <p>Un fichier trouvé: {this.state.userData.data.name} </p>
                        </div>
                }
                else { // On demande de saisir des données puis on calcule
                    if (this.state.userSchema === null) {
                        toShow = <FormCircuit userId={this.state.userData.objectId} handleSchema={this.handleSchema} />
                    } else {
                        /* L'utilisateur a déjà rempli les infos concernant les circuits, on :
                            - calcul les conseils.
                            - sauvegarde les données en BDD.
                        */
                        toShow = <p> On calcule les advices</p>
                    }
                }
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