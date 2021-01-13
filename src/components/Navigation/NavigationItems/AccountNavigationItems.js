import React, { Component } from "react";

import styles from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {

    render() {

        let pathArray = window.location.pathname.split('/');
        let secondLevelLocation = pathArray[1];

        return (
            <div>
                <ul className={styles.NavigationItems}>
                    <NavigationItem link={"/internal/customers/list"}>Liste des clients</NavigationItem>
                    <NavigationItem link={"/internal/customers/edit" }>Gestion des clients</NavigationItem>
                    <NavigationItem link={"/internal/users/edit" }>Gestion des utilisateurs</NavigationItem>
                </ul>
            </div>


        );
    }
}

export default NavigationItems;