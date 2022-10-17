import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'

interface Payload {
  text: string
}

interface Todo {
  id: number
  done: boolean
  text: string
}

type Action = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }

function Home() {
  const onInputClick: MouseEventHandler<HTMLInputElement> = (e) => {
    console.log(`!!`, e?.target)
  }

  const [payload, setPayload] = useState<Payload | null>(null)
  useEffect(() => {
    fetch('../../dist/assets/data.json')
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data)
      })
  }, [])

  const [todos, dispatch] = useReducer((state: Todo[], action: Action) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ]
      case 'REMOVE':
        return state.filter((el) => el.id !== action.id)
      default:
        return state
    }
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)

  const onAddTodo = () => {
    if (inputRef.current) {
      dispatch({
        type: 'ADD',
        text: inputRef.current.value,
      })
      inputRef.current.value = ''
    }
  }

  return (
    <>
      <h1>Input</h1>
      <input type="text" onClick={onInputClick} />
      <div>{JSON.stringify(payload)}</div>
      <h2>Todos:</h2>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: 'REMOVE',
                id: todo.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </>
  )
}

export default Home
