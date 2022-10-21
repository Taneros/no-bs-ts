import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useRef } from 'react'
import { TodosProvider, useTodos } from '../useTodos'

const Button: React.FunctionComponent<DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> & { title?: string } = ({
  title,
  children,
  ...props
}): JSX.Element => {
  return <button {...props}>{title ?? children}</button>
}

const UL = <T,>({
  items,
  render,
  itemClick,
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  items: T[]
  render: (item: T) => ReactNode
  itemClick: (item: T) => void
}): JSX.Element => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => itemClick(item)}>
        {render(item)}
      </li>
    ))}
  </ul>
)

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { todos, addTodo, removeTodo } = useTodos()

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
    <div>
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
        itemClick={(item) => alert(item.id)}
      />
      <div>
        <input type="text" ref={inputRef} />
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  )
}

const AppWrapper = () => {
  return (
    <TodosProvider initialTodos={[{ id: 1, text: 'First!', done: false }]}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridAutoFlow: 'column',
        }}
      >
        <Home />
        <Home />
      </div>
    </TodosProvider>
  )
}

export default AppWrapper
