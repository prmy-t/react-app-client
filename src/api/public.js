import axios from "axios";

export const getAppointments = () =>
  axios
    .get("http://localhost:3000/get-appointments")
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const createAppointment = (data) =>
  axios.post("http://localhost:3000/create-appointment", { ...data });

export const postPublicLogin = (data) =>
  axios
    .post("http://localhost:3000/login", {
      ...data,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const postPublicSingUp = (data) => {
  axios
    .post("http://localhost:3000/signup", { ...data })
    .then((res) => res)
    .catch((err) => console.log(err));
};
