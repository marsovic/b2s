import React from 'react';

import styles from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/InternalNavigationItems";

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <nav className={styles.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;