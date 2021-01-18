import React, { Component } from "react";

import ListUsers from "../../../../../components/Users/ListUsers/Admin/ListUsers"
import Aux from "../../../../../hoc/Aux/Aux"
import Modal from "../../../../../components/UI/Modal/Modal"

class EditUsers extends Component {
    state= {
        showModal: false,
        user: "yo"
    }

    modalHandler = (newState, user) => {
        this.setState({user: user, showModal: newState})
        console.log(user)
    }

    cancelModalHandler = () => {
        this.setState({showModal: false});
    }

    render() {
        return(
            <Aux >
                <Modal 
                    show={this.state.showModal} 
                    modalClose={this.cancelModalHandler}>
                        <p>{this.state.user}</p>
                </Modal>

                <ListUsers modal={this.modalHandler}/>
            </Aux>
        )
    }
}

export default EditUsers;