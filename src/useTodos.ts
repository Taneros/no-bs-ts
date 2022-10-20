import { useCallback, useReducer } from 'react'

type Action = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }

interface Todo {
  id: number
  done: boolean
  text: string
}

export const useTodos = (initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} => {
  const [todos, dispatch] = useReducer((state: Todo[], action: Action) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: Number((Math.random()*100).toFixed(5)),
            text: action.text,
            done: false,
          },
        ]
      case 'REMOVE':
        return state.filter((el) => el.id !== action.id)
      default:
        return state
    }
  }, initialTodos)

  // strong recommendation from Jack Herr is to use callback when exporting functions

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: 'ADD',
      text
    })
  }, [])
  
  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: 'REMOVE',
      id,
    })
  }, [])
  


  return { todos, addTodo, removeTodo }
}
