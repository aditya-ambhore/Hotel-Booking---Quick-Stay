import axios from "axios";

const api = axios.create({
  baseURL: "https://hotel-booking-quick-stay.onrender.com/",
});

export default api;
