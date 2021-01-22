import React, { Component } from "react";

import styles from "./NavigationItems.module.css";
import Aux from "../../../hoc/Aux/Aux"
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {

    render() {
        let items = null;

        if(this.props.mode === "admin") {
            items =
                <ul className={styles.NavigationItems}>
                    <NavigationItem link={"/internal/customers/list"}>Liste des clients</NavigationItem>
                    <NavigationItem link={"/internal/users/list" }>Liste des utilisateurs</NavigationItem>
                    <NavigationItem link={"/internal/users/edit" }>Gestion des utilisateurs</NavigationItem>
                </ul>
        }

        if(this.props.mode === "batisphere") {
            items =
                <ul className={styles.NavigationItems}>
                    <NavigationItem link={"/internal/customers/list"}>Liste des clients</NavigationItem>
                </ul>
        }

        if(this.props.mode === "client") {
            items =
                <ul className={styles.NavigationItems}>
                    <NavigationItem link={"/home"}>Mon résumé</NavigationItem>
                </ul>
        }

        return (
            <Aux>
                {items}
            </Aux>
        );
    }
}

export default NavigationItems;