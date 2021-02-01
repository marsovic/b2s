import React, { Component } from "react";

import ListCustomers from "../../../../../components/Users/ListCustomers/ListCustomers"
import Modal from "../../../../../components/UI/Modal/Modal"
import Aux from "../../../../../hoc/Aux/Aux"

import CSV from "../../../../../components/CSV/processingCSV"

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

    sendJSON = (data1, data2, file) => {
        console.log(data1)
        console.log(data2)
        console.log(file)

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
                    spec={this.props.spec} />

                <CSV sendJSON={this.sendJSON}/>
            </Aux>
        )
    }
}

export default EditCustomers;