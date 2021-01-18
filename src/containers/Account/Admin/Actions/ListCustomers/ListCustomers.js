import React, { Component } from "react";

import ListUsers from "../../../../../components/Users/ListUsers/Batiphere/ListUsers"
import Aux from "../../../../../hoc/Aux/Aux"

class EditCustomers extends Component {

    render() {
        return (
            <Aux >
                <ListUsers spec={this.props.spec}/>
            </Aux>
        )
    }
}

export default EditCustomers;