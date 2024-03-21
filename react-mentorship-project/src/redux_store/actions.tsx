import { createAction } from "@reduxjs/toolkit";

export const setUsername = createAction<string>("user/setUsername");
export const setToken = createAction<string>("user/setToken");
export const logout = createAction<void>("user/logout");
