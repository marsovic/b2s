import React, { Component } from "react";

class MyAccount extends Component {
    render() {
        console.log(this.props.mode)
        return (
            <div>
                <p>
                    T'es connecté en <strong>{this.props.mode}</strong>  ! 
                </p>
            </div>
        );
    }
}

export default MyAccount;