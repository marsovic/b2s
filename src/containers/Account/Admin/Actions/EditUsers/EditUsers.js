import React, { Component } from "react";

import ListUsers from "../../../../../components/Users/ListUsers/Admin/ListUsers"
import Aux from "../../../../../hoc/Aux/Aux"
import Modal from "../../../../../components/UI/Modal/Modal"
import EditUser from "./EditUser/EditUser";

class EditUsers extends Component {
    state = {
        showModal: false,
        user: null
    }

    modalHandler = (newState, userSelected) => {
        this.setState({ showModal: newState })
        this.setState({ user: userSelected })
    }

    cancelModalHandler = () => {
        this.setState({ showModal: false });
        this.setState({ user: null })
    }

    render() {
        let userData = null;

        if (this.state.showModal) {
            userData = <EditUser user={this.state.user} />
        }

        return (
            <Aux >
                <Modal
                    modalClose={this.cancelModalHandler}
                    show={this.state.showModal}>
                    {userData}
                </Modal>
                <ListUsers
                    spec={this.props.spec}
                    modal={this.modalHandler}
                    modalClose={this.cancelModalHandler} />
            </Aux>
        )
    }
}

export default EditUsers;