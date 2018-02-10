import * as React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { ChildProps } from "react-apollo";

const DISCS_QUERY = gql`
    query GetAllDiscs {
        discs {
            title
            artist
            year
            id
        }
    }
`
interface InputProps {
    // possibly props from redux?
}

interface Disc {
    readonly title: string
    readonly artist: string
    readonly year: string
    readonly id: string
}

interface Resp {
    readonly discs: ReadonlyArray<Disc>
}

const withAlbums = graphql<Resp, InputProps>(DISCS_QUERY, {

})

class Albums extends React.Component<ChildProps<InputProps, Resp>, {}> {
    renderDisc = (d: Disc) => (
        <div>
            <div>{d.title}</div>
            <div>{d.artist}</div>
            <div>{d.year}</div>
        </div>
    )

    render(): JSX.Element {
        const { data } = this.props
        const discs = data && data.discs

        if (data && data.loading) {
            return <div>Loading</div>
        }
        if (data && data.error) {
            return <h1>ERROR</h1>
        }

        return (
            <div>
                <ul>{discs && discs.map((d: Disc, i: number) => <li key={i}>{this.renderDisc(d)}</li>)}</ul>
            </div>
        )
    }
}

export default withAlbums(Albums);