import * as React from "react"
import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"
import { ChildProps } from "react-apollo"
import { Session } from "../redux/core"

interface Todo {
    readonly node: {
      readonly id: string
      readonly name: string,
    }
  }

  interface TodoList {
    readonly node: {
      readonly id: string
      readonly name: string
      readonly todos: {
         readonly edges: ReadonlyArray<Todo>,
      },
    }
  }

  interface Response {
    readonly allTodoLists: {
      readonly edges: ReadonlyArray<TodoList>,
    }
    readonly loading: boolean
    readonly error: {}
    readonly refetch: {}
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

const addTodoListMutation = gql`
  mutation addTodoList($name: String!) {
    createTodoList(name: $name) { todoList { id } }
  }
`
const deleteTodoListMutation = gql`
    mutation deleteTodoList($id: Int!) {
        deleteTodoList(id: $id) { todoList { id } }
    }
`

interface InputProps {
    readonly session?: Session
    readonly addTodoList: (input: NewList) => Promise<Response>
    readonly deleteTodoList: (input: DeleteList) => Promise<Response>
}

const withTodoLists = compose(
    graphql<{}>(deleteTodoListMutation, {name: "deleteTodoList"}),
    graphql<{}>(addTodoListMutation, { name: "addTodoList" }),
    graphql<Response, InputProps>(allTodoLists, {}),
)

interface NewList {
    readonly variables: {
        readonly name: string,
    }
}

interface DeleteList {
    readonly variables: {
        readonly id: number,
    }
}

class TodoLists extends React.Component<ChildProps<InputProps, Response>, {}> {
    constructor(props: ChildProps<InputProps, Response> ) {
        super(props)
        this.renderTodoLists = this.renderTodoLists.bind(this)
    }

    renderTodo(t: Todo, i: number): JSX.Element | undefined {
        if (t.node.name === "") {
            return
        }

        return (<li key={`doh-${i}`}>{t.node.name}</li>)
    }

    renderTodoLists(tl: TodoList, i: number): JSX.Element {
        const todoListId = parseInt(atob(tl.node.id).split(":")[1], 10)
        return (
            <div key={`todo-${i}`}>
            <div>
                {tl.node.name}
                <button onClick={() => this.props.deleteTodoList({variables: {id: todoListId}})
                    .then(this.props.data && this.props.data.refetch)}>delete</button>
            </div>
                <ul>
                    {tl.node.todos.edges.map((t: Todo, idx: number) => this.renderTodo(t, idx))}
                </ul>
            </div>
        )
    }

    render(): JSX.Element {
        const { data, session } = this.props
        const todoLists = data && data.allTodoLists

        if (data && data.loading) {
            return <div>Loading</div>
        }
        if (data && data.error) {
            return <h1>ERROR</h1>
        }

        const newList: NewList = {variables: {name: "test"}}

        const createDisc = this.props.addTodoList &&  this.props.addTodoList

        return (
            <div>
                <ul>
                    {todoLists && todoLists.edges.map((tl: TodoList, i: number) => (
                        <div key={`list-${i}`}>
                            <li >{this.renderTodoLists(tl, i)}</li>
                        </div>
                    ))}
                </ul>
                {session && session.loggedIn === false && <div>with props from redux</div>}
                {createDisc &&
                (
                    <button onClick={() => createDisc && createDisc(newList)
                        .then(this.props.data && this.props.data.refetch)}>Add disc</button>
                )}
            </div>
        )
    }
}

export default withTodoLists(TodoLists)