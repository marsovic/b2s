import React, { Component } from 'react';

import Aux from "../Aux/Aux";
import styles from './Layout.module.css';
import Toolbar from "../../components/Navigation/AccountToolbar/Toolbar";

class layout  extends Component {
    render () {
        return(
        <Aux>
            <Toolbar />
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

export default layout;