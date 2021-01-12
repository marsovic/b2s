import React, { Component } from "react";

import Button from "../../UI/Button/Button"


class Logout extends Component {

    loginOutHandler = () => {
        // Modification du stockage de session lors de la déconnexion
        if(sessionStorage.getItem("isUserLogged")) {
            sessionStorage.removeItem("localId");
            sessionStorage.removeItem("token");
            sessionStorage.setItem("isUserLogged", false)

            this.props.loginOut(false);
        }
    }

    render() {
        return (
            <div>
                <Button btnType="Danger" clicked={this.loginOutHandler}>
                    Déconnexion
                </Button>
            </div>
        );
    }
}

export default Logout;