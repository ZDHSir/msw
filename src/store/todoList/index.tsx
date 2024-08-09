import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface todoListState {
    todoList: any[],
    doneList: any[]
}

const initialState: todoListState = {
    todoList: [],
    doneList: []
}

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<any>){
      state.todoList = action.payload
    },
    setDoneList(state, action: PayloadAction<any>){
      return state.doneList = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTodoList, setDoneList } = todoListSlice.actions

export default todoListSlice.reducer