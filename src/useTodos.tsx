import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useReducer } from 'react'
import { createGlobalState } from 'react-use'

interface Todo {
  id: number
  done: boolean
  text: string
}

const useGlobalTodos = createGlobalState<Todo[]>([])

export const useTodosManager = (
  initialTodos: Todo[]
): {
  todos: Todo[]
  addTodo: (text: string) => void
  removeTodo: (id: number) => void
} => {
  const [todos, setTodos] = useGlobalTodos()

  useEffect(() => {
    setTodos(initialTodos)
  }, [initialTodos])

  // strong recommendation from Jack Herr is to use callback when exporting functions

  const addTodo = useCallback(
    (text: string) => {
      setTodos([
        ...todos,
        {
          id: Number((Math.random() * 100).toFixed(5)),
          text: text,
          done: false,
        },
      ])
    },
    [todos]
  )

  const removeTodo = useCallback(
    (removeId: number) => {
      setTodos(todos.filter((el) => el.id !== removeId))
    },
    [todos]
  )

  return { todos, addTodo, removeTodo }
}
