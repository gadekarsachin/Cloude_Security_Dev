import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
  basicToken: "",
  edit: {},
  isEdit: false,
  editrole: {},
  isRoleEdit: false,
  res: null, // Add the 'res' property to the initial state
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload.status;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload.info;
    },
    setToken: (state, action) => {
      state.basicToken = action.payload.token;
    },
    editUser: (state, action) => {
      state.isEdit = action.payload.isEdit;
      state.edit = action.payload.data;
    },
    editRole: (state, action) => {
      state.isRoleEdit = action.payload.isRoleEdit;
      state.editrole = action.payload.data;
    },
    setRes: (state, action) => {
      state.res = action.payload.res;
    }, // Add the 'setRes' action
  },
});

export const {
  setLoginStatus,
  setUserInfo,
  setToken,
  editUser,
  editRole,
  setRes,
} = dataSlice.actions;

export default dataSlice.reducer;
