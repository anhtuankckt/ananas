import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authUser: null
}

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem('actkn')
      } else {
        if (action.payload.token) {
          localStorage.setItem('actkn', action.payload.token)
        }
      }

      state.authUser = action.payload
    }
  }
})

export const { setUser } = authSlice.actions

export default authSlice.reducer