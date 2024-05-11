import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    token: string
}

const initialState: UserState = {} as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState>){
      return state = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo,  } = userSlice.actions

export default userSlice.reducer