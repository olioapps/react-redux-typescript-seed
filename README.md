# react-redux-typescript-seed
A jumping off point for building a frontend app

### Getting started

##### Clone repo
- cd into cloned repo
- yarn install
- yarn start
- garbage creds will log you in

##### Getting login working with your backend
- on line 30 of client.ts replace "url here" with your root url
- then if you're posting your creds to the backend change login method to something like this
```js
login = (username: string, password: string): HandledResp => {
    return request.
        post(this.buildUrl("/login")).
        send({ username, password }).
        type("application/json").
        accept("application/json").
        end().
        then((res: Resp) => handleResp(res))
        .catch((res: Resp) => handleResp(res))
}
```
- then uncomment code in session_sagas .ts

##### Includes component library [blueprintjs](http://blueprintjs.com//docs/)
- checkout src/components/progress_spinner/progress_spinner.tsx

##### Uses [css modules](https://github.com/gajus/react-css-modules/blob/master/README.md#css-modules) and [blueprint css](http://blueprintjs.com//docs/#core/components/navbar.css-api)

```js
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
```