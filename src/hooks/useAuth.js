import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let accessToken = null;
let csrfToken = null;
let refreshPromise = null;

function setAccessToken(token) {
  accessToken = token;
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

function isAuthPath(url) {
  try {
    const pathname = new URL(url, API.defaults.baseURL).pathname;
    return pathname.startsWith("/auth");
  } catch {
    return typeof url === "string" && url.startsWith("/auth");
  }
}

const needsCsrf = (method) => 
  ["post", "put", "patch", "delete"].includes((method || "").toLowerCase());

async function ensureCsrf(force = false) {
  if (csrfToken && !force) return csrfToken;
  try {
    const { data } = await API.get("/auth/csrf");
    csrfToken = data?.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    throw error;
  }
}

async function authPost(url, payload = {}) {
  try {
    await ensureCsrf();
    return await API.post(url, payload, {
      headers: csrfToken ? { "X-CSRF-Token": csrfToken } : {},
    });
  } catch (error) {
    // Retry once if CSRF token is invalid
    if (error?.response?.status === 403) {
      await ensureCsrf(true);
      return await API.post(url, payload, {
        headers: csrfToken ? { "X-CSRF-Token": csrfToken } : {},
      });
    }
    throw error;
  }
}

// Refresh token
async function doRefresh() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        await ensureCsrf();
        const { data } = await API.post("/auth/refresh", {}, {
          headers: csrfToken ? { "X-CSRF-Token": csrfToken } : {},
        });
        setAccessToken(data.accessToken);
        return data.accessToken;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

// ===== Request Interceptor =====
API.interceptors.request.use(async (config) => {
  const isAuth = isAuthPath(config.url);

  // Thêm CSRF token cho auth requests
  if (isAuth && needsCsrf(config.method)) {
    await ensureCsrf();
    if (csrfToken) {
      config.headers = config.headers || {};
      config.headers["X-CSRF-Token"] = csrfToken;
    }
  }

  return config;
});

// ===== Response Interceptor =====
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    if (!config || !response) {
      return Promise.reject(error);
    }

    const status = response.status;
    const isAuth = isAuthPath(config.url);

    // Refresh token cho 401 errors (trừ auth endpoints)
    if (status === 401 && !isAuth && !config._retry) {
      config._retry = true;
      
      try {
        const newToken = await doRefresh();
        config.headers.Authorization = `Bearer ${newToken}`;
        return API(config);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        setAccessToken(null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ===== Auth API Functions =====
export async function bootstrapAuth() {
  try {
    await ensureCsrf();
    
    // Thử refresh token để lấy access token mới
    const { data } = await API.post("/auth/refresh", {}, {
      headers: csrfToken ? { "X-CSRF-Token": csrfToken } : {},
    });
    
    setAccessToken(data.accessToken);
    return data.accessToken;
  } catch (error) {
    // Nếu refresh thất bại, không có user logged in
    console.log("No valid refresh token, user needs to login");
    setAccessToken(null);
    return null;
  }
}

export async function signup(payload) {
  const { data } = await authPost("/auth/signup", payload);
  return data;
}

export async function signin(payload) {
  const { data } = await authPost("/auth/login", payload);
  setAccessToken(data.accessToken);
  return data;
}

export async function me() {
  const { data } = await API.get("/auth/me");
  return data.user;
}

export async function signout() {
  try {
    await authPost("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    setAccessToken(null);
    csrfToken = null;
  }
}
export async function getProfile() {
  const { data } = await API.get("/api/profile");
  return data.profile;
}

export async function updateProfile(payload) {
  const { data } = await API.put("/api/profile", payload);
  return data;
}

// ===== Student API Functions =====
export async function getTutors() {
  const { data } = await API.get("/api/tutors");
  return data.tutors;
}

export async function registerProgram(payload) {
  const { data } = await API.post("/api/program/register", payload);
  return data;
}

export async function scheduleSession(payload) {
  const { data } = await API.post("/api/sessions", payload);
  return data;
}

export async function joinSession(sessionId) {
  const { data } = await API.get(`/api/student/sessions/${sessionId}/join`);
  return data;
}

export async function addFeedback(payload) {
  const { data } = await API.post("/api/student/feedback", payload);
  return data;
}

// ===== Tutor API Functions =====
export async function getPendingSessions() {
  const { data } = await API.get("/api/sessions/pending");  // THÊM /api/tutor
  return data.sessions;
}

export async function confirmSession(sessionId, payload) {
  const { data } = await API.patch(`/api/sessions/${sessionId}/confirm`, payload);
  return data;
}
export default API;