import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
  id: number
  done: boolean
  text: string
}

interface TodosSliceState {
  todos: Todo[]
}

const initialState: TodosSliceState = {
  todos: [{ id: 1, text: 'First!', done: false }]
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos =  [
        ...state.todos,
        {
          id: Number((Math.random() * 100).toFixed(5)),
          text: action.payload,
          done: false,
        },
      ]
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload)
    }
  }
})

export const { addTodo, removeTodo } = todosSlice.actions

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer
  }
})

export default store


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {}
export type AppDispatch = typeof store.dispatch

export const selectTodos = (state: RootState) => state.todos.todos