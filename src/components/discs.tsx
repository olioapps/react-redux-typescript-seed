import * as React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

interface Todo {
  readonly node: {
    readonly id: string
    readonly name: string
  }
}

interface TodoList {
  readonly node: {
    readonly id: string
    readonly name: string
    readonly todos: {
       readonly edges: ReadonlyArray<Todo>
    }
  }
}

interface AllTodoLists {
  readonly allTodoLists: {
    readonly edges: ReadonlyArray<TodoList>
  }
}

const allTodoLists = gql`query {
  allTodoLists {
       edges {
           node {
               id
               name
               todos {
                   edges {
                       node {
                           id
                           name
                           todoListId
                       }
                   }
               }
           }
       }
   }
}`

const withDiscsQuery  =  graphql<AllTodoLists>(allTodoLists)

const renderTodoLists = (tl: TodoList, i: number) => (
  <div key={`blah-${i}`}>
    <div>{tl.node.name}</div>
    <ul>
      {tl.node.todos.edges.map((t: Todo, i: number) => (<li key={`todo-${i}`}>{t.node.name}</li>))}
    </ul>
  </div>
)

export default withDiscsQuery(({data}) => {
    const todoLists = data && data.allTodoLists

    if (data && data.loading) {
        return <div>Loading</div>
    }
    if (data && data.error) {
        return <h1>ERROR</h1>
    }

    return (
        <div>
            <ul>{todoLists && todoLists.edges.map((tl: any, i: number) => <li key={i}>{renderTodoLists(tl, i)}</li>)}</ul>
        </div>
    )
})