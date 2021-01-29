import React, { Component } from "react";

import ListUsers from "../../../../../components/Users/ListUsers/Admin/ListUsers"
import Aux from "../../../../../hoc/Aux/Aux"
import Modal from "../../../../../components/UI/Modal/Modal"
import Button from "../../../../../components/UI/Button/Button"
import EditUser from "./EditUser/EditUser";
import AddUser from "./AddUser/AddUser";

import Circuit from "../../../../../components/FormCircuits/FormCircuits"

class EditUsers extends Component {
    state = {
        showModal: false,
        user: null,
        updated: true,
        addUser: false,

        //TO delete
        time: ""
    }

    modalEditHandler = (newState, userSelected) => {
        this.setState({ showModal: newState })
        this.setState({ user: userSelected })
    }

    modalAddHandler = () => {
        this.setState({ showModal: true })
        this.setState({ addUser: true })
    }

    cancelModalHandler = () => {
        this.setState({ showModal: false });
        this.setState({ user: null, addUser: false })
    }

    updateByModal = () => {
        this.setState({ updated: !this.state.updated })
    }

    consoleLogJSON(data1, data2) {
        console.log(data1)
        console.log(data2)
    }

    setCurrentTime(data) {
        this.setState({ time: data })
    }

    render() {
        let userData = null;

        if (this.state.showModal && this.state.user !== null) {
            userData = <EditUser user={this.state.user} />
        }

        if (this.state.showModal && this.state.addUser === true) {
            userData = <AddUser modal={this.modalAddHandler} />
        }

        // Premier test pour l'appel de l'algorithme

        fetch('/time')
            .then(res => res.json())
            .then(data => {
                console.log("yolo", JSON.parse(data.time) )
                // this.setCurrentTime(data.time);
            });


        return (
            <Aux >
                <Modal
                    modalClose={this.cancelModalHandler}
                    show={this.state.showModal}
                    update={this.updateByModal}>
                    {userData}
                </Modal>
                <ListUsers
                    spec={this.props.spec}
                    modal={this.modalEditHandler} />
                <Button btnType="Success" clicked={this.modalAddHandler}>
                    Créer un utilisateur
                </Button>

                <p>Time: {this.state.time} </p>
                <Circuit />
            </Aux>
        )
    }
}

export default EditUsers;
