import Cookies from "js-cookie";

let memoryAccessToken = null;

let isRefreshing = false;
let refreshPromise = null;

export function setAccessToken(token) {
  memoryAccessToken = token;
}

export function getAccessToken() {
  if (memoryAccessToken) return memoryAccessToken;

  const token = Cookies.get("access_token");

  if (token) {
    memoryAccessToken = token;
  }

  return token;
}

export function clearAccessToken() {
  memoryAccessToken = null;
}

function logout() {
  clearAccessToken();

  Cookies.remove("role");

  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
}

async function refreshAccessToken(baseUrl) {
  if (!isRefreshing) {
    isRefreshing = true;

    refreshPromise = fetch(
      `${baseUrl}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Refresh token invalide");
        }

        const data = await response.json();

        setAccessToken(data.access_token);
        Cookies.set(
          "access_token",
          data.access_token,
          {
            expires: 1,
            secure: process.env.NODE_ENV === "production",
          }
        );
        Cookies.set("role", data.role, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
        });

        return data.access_token;
      })
      .catch((error) => {
        logout();
        throw error;
      })
      .finally(() => {
        isRefreshing = false;
      });
  }

  return refreshPromise;
}

export async function customFetch(url, options = {}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const fullUrl = `${baseUrl}${url}`;

  options.headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getAccessToken();

  if (token) {
    options.headers[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  options.credentials = "include";

  let response = await fetch(fullUrl, options);


  if (response.status === 401) {

    if (url.includes("/auth/refresh")) {
      logout();
      return response;
    }

    try {

      const newAccessToken =
        await refreshAccessToken(baseUrl);


      options.headers[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;

      response = await fetch(fullUrl, options);
    } catch (error) {
      logout();
      throw error;
    }
  }

  return response;
}