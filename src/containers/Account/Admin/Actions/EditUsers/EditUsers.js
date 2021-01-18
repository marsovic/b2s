import React, { Component } from "react";

import ListUsers from "../../../../../components/Users/ListUsers/Admin/ListUsers"
import Aux from "../../../../../hoc/Aux/Aux"
import Modal from "../../../../../components/UI/Modal/Modal"

class EditUsers extends Component {
    state = {
        showModal: null,
        user: null
    }

    modalHandler = (newState, userSelected) => {
        this.setState({ showModal: newState})
        this.setState({ user: userSelected})
    }

    cancelModalHandler = () => {
        this.setState({showModal: false});
    }

    render() {

        let userSelected = null;

        if(this.state.user !== null){
        userSelected = (
            <div>
                <p> Name: {this.state.user.objectId}</p>
                <p> Right: {this.state.user.right} </p>
                <p> Entreprise: {this.state.user.username}</p>
            </div>
        )
        }

        return(
            <Aux >
                <Modal 
                   modalClose={this.cancelModalHandler}
                   show={this.state.showModal}>
                        {userSelected}
                </Modal>
                <p> c'est moi</p>
                <ListUsers modal={this.modalHandler}/>
            </Aux>
        )
    }
}

export default EditUsers;