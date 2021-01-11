import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div className={styles.Logo}>
        <NavLink to="/auth" exact> Logo </NavLink>
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;