import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useCallback, useRef } from 'react'
import { useTodosManager } from '../useTodos'
import { Provider, useSelector, useDispatch } from 'react-redux'
import store, { selectTodos, addTodo, removeTodo, AppDispatch} from '../store'

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
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  // const { todos, addTodo, removeTodo } = useTodosManager(initialTodos)

  const onAddTodo = useCallback(() => {
    if (inputRef.current && inputRef.current.value !== '') {
      dispatch(addTodo(inputRef.current.value))
      inputRef.current.value = ''
    }
  },[])

  const onRemoveTodo = (id: number) => {
    dispatch(removeTodo(id))
  }

  return (
    <div>
      <h1>Todos:</h1>
      <UL
        items={todos}
        render={(todo) => (
          <>
            {todo.text}
            <Button type="button" onClick={() =>onRemoveTodo(todo.id)}>
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
      <Provider store={store}>
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
      </Provider>
  )
}

export default AppWrapper
