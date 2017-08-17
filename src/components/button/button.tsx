import * as classNames from "classnames"
import * as React from "react"

import {
    Button as BPButton,
    IButtonProps,
} from "@blueprintjs/core"

const styles = require("./button.module.css")

type ButtonKind = "primary" | undefined

interface ButtonProps extends IButtonProps {
    readonly kind?: ButtonKind,
}

export class Button extends React.Component<ButtonProps, {}> {
    render(): JSX.Element {
        const classes = classNames(
            styles.button,
            this.props.kind ? styles[this.props.kind] : undefined,
            this.props.className,
        )
        const { children, ...props } = this.props
        return (
            <BPButton {...props} className={classes}>
                {children}
            </BPButton>
        )
    }
}