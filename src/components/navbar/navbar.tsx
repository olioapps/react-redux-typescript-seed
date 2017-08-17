import * as React from "react"

const styles = require("./navbar.module.css")

interface NavbarProps {
    readonly logout: () => void,
    readonly userName: string,
}

export function Navbar(props: NavbarProps): JSX.Element {
    const { userName, logout } = props

    return(
        <nav className={`pt-navbar .modifier ${styles.nav_bar}`}>
            <div className={styles.container}>
                <div className="pt-navbar-group pt-align-right">
                    <button className={`pt-button pt-minimal ${styles.user_menu}`}>
                        <span className={styles.user_name} onClick={logout}>{userName}</span>
                        <span
                            className={`pt-icon-standard pt-icon-chevron-down ${styles.user_menu_chevron}`}
                        />
                    </button>
                </div>
            </div>
        </nav>
    )
}