import * as React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

interface Disc {
  readonly title: string
  readonly artist: string
  readonly year: string
  readonly id: string
}

interface Resp {
  readonly discs: ReadonlyArray<Disc>
}

const withDiscsQuery  =  graphql<Resp>(gql`
    query GetAllDiscs {
        discs {
            title
            artist
            year
            id
        }
    }
`)

const renderDisc = (d: Disc) => (
  <div>
    <div>{d.title}</div>
    <div>{d.artist}</div>
    <div>{d.year}</div>
  </div>
)

export default withDiscsQuery(({ data }) => {
  const discs = data && data.discs

  return (
    <div>
      <ul>{discs && discs.map((d: Disc, i: number) => <li key={i}>{renderDisc(d)}</li>)}</ul>
    </div>
  )
})