import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useRef } from 'react'
import { useTodos } from '../useTodos'

const Button: React.FunctionComponent<DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> & { title?: string } = ({
  title,
  children,
  ...props
}): JSX.Element => {
  return <button {...props}>{title ?? children}</button>
}

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { todos, addTodo, removeTodo } = useTodos([
    {
      id: 1,
      text: 'First!',
      done: false,
    },
  ])

  // PropsWithChildren<DetailedHTMLFactory<HTMLAttributes<HTMLUListElement>, HTMLUListElement>>

  const UL = <T,>({
    items,
    render,
  }: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & { items: T[]; render: (item: T) => ReactNode }): JSX.Element => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  )

  const onAddTodo = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      addTodo(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  const onRemoveTodo = (id: number) => {
    removeTodo(id)
  }

  return (
    <>
      <h1>Todos:</h1>
      <UL
        items={todos}
        render={(todo) => (
          <>
            {todo.text}
            <Button type="button" onClick={() => onRemoveTodo(todo.id)}>
              Remove
            </Button>
          </>
        )}
      />
      <div>
        <input type="text" ref={inputRef} />
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </>
  )
}

export default Home
