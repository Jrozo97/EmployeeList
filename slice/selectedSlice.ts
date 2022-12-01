import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateSelected: [],
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setArray(state, action) {
      state.stateSelected = action.payload;
    },
  },
});

export default selectedSlice.reducer;
export const selectAllSelected = (state: {
  selectedSlice: { stateSelected: string[] };
}) => state.selectedSlice.stateSelected;
export const { setArray } = selectedSlice.actions;
