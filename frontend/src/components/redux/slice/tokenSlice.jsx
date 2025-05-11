import { createSlice } from "@reduxjs/toolkit";
 
const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("token"),
  },

  reducers: {
    logOut: (state, action) => {
      console.log("state:", state);
      console.log("action: ", action);
      localStorage.clear();
      location.reload();
      
    },
  },
});

export const { logOut } = tokenSlice.actions;
export default tokenSlice.reducer;
