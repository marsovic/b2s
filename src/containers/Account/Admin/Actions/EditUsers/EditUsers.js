import React, { Component } from "react";

import ListUsers from "../../../../../components/Users/ListUsers/Admin/ListUsers"
import Aux from "../../../../../hoc/Aux/Aux"
import Modal from "../../../../../components/UI/Modal/Modal"
import Button from "../../../../../components/UI/Button/Button"
import EditUser from "./EditUser/EditUser";
import AddUser from "./AddUser/AddUser";
import LinearChart from '../../Graphiques/LinearChart/LinearChart';
import CSV from '../../../../../components/CSV/processingCSV'


class EditUsers extends Component {
    state = {
        showModal: false,
        user: null,
        updated: true,
        addUser: false,
        dataObtained: false,
        columnsName : null,
        data : null,
    }

    loadData = (data1, data2) => {
console.log(data1); // Show the names of the columns
        //console.log(data2); // Show data on each row 
        this.setState({
            dataObtained: true,
            columnsName : data1,
            data : data2,
          });

          console.log(JSON.stringify(data2))
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

    render() {
        let userData = null;

        if (this.state.showModal && this.state.user !== null) {
            userData = <EditUser user={this.state.user} />
        }

        if (this.state.showModal && this.state.addUser === true) {
            userData = <AddUser modal={this.modalAddHandler} />
        }

        if(this.state.dataObtained === true){

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
                    <LinearChart data = {this.state.data} columns = {this.state.columnsName}/>

                </Aux>
            )
        }

        else {

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
                    <CSV sendJSON={this.loadData}/>
                </Aux>
            )
        }

        
    }
}

export default EditUsers;
