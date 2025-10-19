
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000/api',
  withCredentials: true, // ✅ allows sending cookies / auth headers if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
