import axios from "axios";

export const getOrders = () =>
  axios
    .get("http://localhost:3000/get-orders")
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const adminLogin = (data) =>
  axios
    .post("http://localhost:3000/admin-login", { ...data })
    .then((res) => res.data)
    .catch((err) => console.log(err));
