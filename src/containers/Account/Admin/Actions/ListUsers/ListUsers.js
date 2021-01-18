import React, { Component } from "react";

import ListUsers from "../../../../../components/Users/ListUsers/Admin/ListUsers"
import Aux from "../../../../../hoc/Aux/Aux"

class Users extends Component {
    render() {
        return(
            <Aux >
                {<ListUsers spec={this.props.spec}/>}
            </Aux>
        )
    }
}

export default Users;
