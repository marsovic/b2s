import React from 'react';

import styles from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/AccountNavigationItems";

// Recuperation de la premiere valeur dans l'URL apres le /
let pathArray = window.location.pathname.split('/');
let secondLevelLocation = pathArray[1];

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <nav className={styles.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;