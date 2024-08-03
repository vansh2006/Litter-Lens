import { Inter } from "next/font/google";
import styles from './style.module.css';

const inter = Inter({ subsets: ["latin"] });

import logo from './TrashTalkLogo.png'; 

export default function RootLayout({children}) {
    return (
        <>
            <nav className={styles.Titlebar}>
                <img className={styles.logo} src={logo.src} alt="logo" />
                <a className={styles.title} href="/">TrashTalk</a>
                <div className={styles.menu}>
                    <ul className={styles.menuItems}>
                        <li>
                            <a href="/status" >Status</a>
                        </li>
                        <li>
                            <a href="/about" >About</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>{children}</div>
        </>
    );
}