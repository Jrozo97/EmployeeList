import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { DataUser } from '../interface/dataUser.interface';


const initialState: DataUser[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default usersSlice.reducer
export const selectAllUsers = (state: { usersSlice: DataUser[]; }) => state.usersSlice