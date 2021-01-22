import React, { Component } from "react";

import ListUsers from "../../../../../components/Users/ListUsers/Admin/ListUsers"
import Aux from "../../../../../hoc/Aux/Aux"
import Modal from "../../../../../components/UI/Modal/Modal"
import Button from "../../../../../components/UI/Button/Button"
import EditUser from "./EditUser/EditUser";
import AddUser from "./AddUSer/AddUser";

class EditUsers extends Component {
    state = {
        showModal: false,
        user: null,
        updated: true,
        addUser: false
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
        this.setState({updated: !this.state.updated})
    } 

    render() {
        let userData = null;

        if (this.state.showModal && this.state.user !== null) {
            userData = <EditUser user={this.state.user} />
        }

        if (this.state.showModal && this.state.addUser === true) {
            userData = <AddUser modal={this.modalAddHandler} />
        }

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
            </Aux>
        )
    }
}

export default EditUsers;