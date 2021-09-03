import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAppointment = createAsyncThunk("appointment/get", async () => {
  return await axios.get("http://localhost:3000/get-appointments");
});

export const getPersonalAppointment = createAsyncThunk(
  "appointment/getPersonal",
  async (data, getState) => {
    return await await axios.post("http://localhost:3000/personal-orders", {
      ...data,
    });
  }
);

export const setStatusApi = createAsyncThunk(
  "appointment/setStatus",
  async (data) => {
    return await axios.post("http://localhost:3000/change-status", {
      ...data,
    });
  }
);

const initialState = {
  appointments: [],
  status: "",
  pAppointments: [],
};
const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  extraReducers: {
    [getAppointment.pending]: (state) => {
      state.status = "loading";
    },
    [getAppointment.fulfilled]: (state, { payload }) => {
      state.appointments = payload.data;
      state.status = "success";
    },
    [getAppointment.rejected]: (state) => {
      state.status = "failed";
    },

    [getPersonalAppointment.fulfilled]: (state, { payload }) => {
      state.pAppointments = payload.data;
    },

    [setStatusApi.fulfilled]: (state) => {
      window.location.reload();
    },
  },
});

export default appointmentSlice.reducer;
