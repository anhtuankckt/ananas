import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  suggestedUsers: []
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload
    }
  }
})

export const { setSuggestedUsers } = userSlice.actions

export default userSlice.reducer