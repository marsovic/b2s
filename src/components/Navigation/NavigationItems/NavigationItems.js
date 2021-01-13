import React, { Component } from "react";

import styles from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {

    render() {
        return (
            <div>
                <ul className={styles.NavigationItems}>
                    <NavigationItem link={"/"+ this.props.main }>Compte</NavigationItem>
                </ul>
            </div>


        );
    }
}

export default NavigationItems;