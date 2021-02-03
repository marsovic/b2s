import React, { Component } from "react";

import ListCustomers from "../../../../../components/Users/ListCustomers/ListCustomers"
import Modal from "../../../../../components/UI/Modal/Modal"
import Aux from "../../../../../hoc/Aux/Aux"

class ListCustomer extends Component {
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
                </Modal>
                <ListCustomers
                    spec={this.props.spec} 
                    modal= {this.modalEditHandler}/>
            </Aux>
        )
    }
}

export default ListCustomer;