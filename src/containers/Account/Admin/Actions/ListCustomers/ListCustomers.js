import React, { Component } from "react";

import ListCustomers from "../../../../../components/Users/ListCustomers/ListCustomers"
import Modal from "../../../../../components/UI/Modal/Modal"
import Aux from "../../../../../hoc/Aux/Aux"

class EditCustomers extends Component {
    state = {
        userSelected: false,
        addUser: false,
        showModal: false,
        user: null,
        updated: true
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

    render() {
        return (
            <Aux >
                <Modal
                    modalClose={this.cancelModalHandler}
                    show={this.state.showModal}
                    update={this.updateByModal}>
                    {<p>coucou</p>}
                </Modal>
                <ListCustomers
                    spec={this.props.spec}/>
            </Aux>
        )
    }
}

export default EditCustomers;