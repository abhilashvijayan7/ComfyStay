import { createSlice } from '@reduxjs/toolkit'

export const userDetailsSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserDetails: (state,action) => {
         state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserDetails} = userDetailsSlice.actions

export default userDetailsSlice.reducer