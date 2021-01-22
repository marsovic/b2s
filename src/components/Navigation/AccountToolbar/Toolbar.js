import React from 'react';

import styles from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/SecondNavigationItems";

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <nav>
            <NavigationItems mode={props.mode}/>
        </nav>
    </header>
);

export default toolbar;