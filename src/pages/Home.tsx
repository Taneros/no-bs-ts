import React, { ButtonHTMLAttributes, DetailedHTMLFactory, HTMLAttributes, MouseEventHandler, PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'

interface Payload {
  text: string
}

interface Todo {
  id: number
  done: boolean
  text: string
}

type Action = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }

const useNumber = (initialValue: number) => useState<number>(initialValue)

type UseNumberValue = ReturnType<typeof useNumber>[0]
type UseNumberSetValue = ReturnType<typeof useNumber>[1]

const Incrementer: React.FC<{
  value: UseNumberValue
  setValue: UseNumberSetValue
}> = ({ value, setValue }) => {
  return (
    <button
      onClick={() => {
        setValue(value + 1)
      }}
    >
      Add - {value}
    </button>
  )
}

// eslint-disable-next-line react/prop-types
const Button: React.FunctionComponent<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> & { title?: string } = ({ title, children, ...props }) => {
  return <button {...props}>{title ?? children}</button>
}

const Home = () => {
  const onInputClick: MouseEventHandler<HTMLInputElement> = (e) => {
    console.log(`!!`, e?.target)
  }

  const [payload, setPayload] = useState<Payload | null>(null)
  const [value, setValue] = useNumber(0)

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
          <Button
            type="button"
            onClick={() =>
              dispatch({
                type: 'REMOVE',
                id: todo.id,
              })
            }
          >
            Remove
          </Button>
        </div>
      ))}
      <div>
        <input type="text" ref={inputRef} />
        <Button onClick={onAddTodo}>Add Todo</Button>
        <br />
        <Incrementer setValue={setValue} value={value} />
      </div>
    </>
  )
}

export default Home
