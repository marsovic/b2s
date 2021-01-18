import React, { Component } from "react";

import styles from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {

    render() {
        return (
            <div>
                <ul className={styles.NavigationItems}>
                    <NavigationItem link={"/internal/customers/list"}>Liste des clients</NavigationItem>
                    <NavigationItem link={"/internal/users/list" }>Liste des utilisateurs</NavigationItem>
                    <NavigationItem link={"/internal/users/edit" }>Gestion des utilisateurs</NavigationItem>
                </ul>
            </div>


        );
    }
}

export default NavigationItems;