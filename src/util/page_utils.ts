import { RouteComponentProps } from "react-router"

export const genericRouteProps = {} as RouteComponentProps<{}>

export function setPageTitle(title: string): void {
    document.title = `${title} | Your App`
}