import React, { Component } from "react";
import { Route } from 'react-router-dom';

import Auth from "../../components/Auth/Auth";


class MyAccount extends Component {
    render() {
        return (
            <div>
                <p>
                    T'es connecté !
                </p>
            </div>
        );
    }
}

export default MyAccount;