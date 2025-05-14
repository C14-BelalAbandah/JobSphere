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
      localStorage.removeItem("token")
      localStorage.removeItem("userName")
      localStorage.removeItem("userId")
      localStorage.removeItem("role")



      location.reload();
      
    },
  },
});

export const { logOut } = tokenSlice.actions;
export default tokenSlice.reducer;
