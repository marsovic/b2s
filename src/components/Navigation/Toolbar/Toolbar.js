import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import logoBatisphere from '../../../assets/Images/batisphere_logo_horizontal.png';
import logoOptisphere from '../../../assets/Images/optisphere_logo_horizontal.png';

// Recuperation de la premiere valeur dans l'URL apres le /
let pathArray = window.location.pathname.split('/');
let secondLevelLocation = pathArray[1];

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div className={styles.Logo}>
        <NavLink to={"/internal"} exact> 
            <img src={logoBatisphere} alt={"b2s"} />
            <img src={logoOptisphere} alt={"b2s"} />
        </NavLink>
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems main={secondLevelLocation}/>
        </nav>
    </header>
);

export default toolbar;