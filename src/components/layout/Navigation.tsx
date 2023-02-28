
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

export function Navigation(props: any) {
    return (
        <header className={styles.header}>
            <h1>Photos</h1>
            <nav>
                <ul className={styles.navs}>
                    <li><NavLink className={styles.link} to="/"><span>Recently Added</span></NavLink></li>
                    <li><NavLink className={styles.link} to="/favorites"><span>Favorited</span></NavLink></li>
                </ul>
            </nav>
        </header>
    );
}