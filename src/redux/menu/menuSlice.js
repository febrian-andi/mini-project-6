import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setActiveMenu = createAsyncThunk("menu/setActiveMenu", async (menu) => {
  return menu;
});

const initialState = {
  activeMenu: "dashboard",
};

const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setActiveMenu.fulfilled, (state, action) => {
      state.activeMenu = action.payload;
    });
  },
});

export default MenuSlice.reducer;