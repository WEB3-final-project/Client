import Cookies from 'js-cookie';
let memoryAccessToken = null;

export const customFetch = async (url, options = {}) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}`;
  const fullUrl = `${baseUrl}${url}`;

  if (!memoryAccessToken && typeof window !== "undefined") {
    memoryAccessToken = Cookies.get("access_token");
  }

  options.headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (memoryAccessToken) {
    options.headers["Authorization"] = `Bearer ${memoryAccessToken}`;
  }

  options.credentials = "include"; 

  let response = await fetch(fullUrl, options);

  if (response.status === 401 || response.status === 403) {

    if (url.includes("/token/refresh")) return response;

    const refreshResponse = await fetch(`${baseUrl}/api/auth/token/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      memoryAccessToken = data.access_token;
      Cookies.set("role", data.role, { expires: 1, secure: process.env.NODE_ENV === 'production' });
      Cookies.set("access_token", data.access_token, { expires: 1, secure: process.env.NODE_ENV === 'production' });
      
      options.headers["Authorization"] = `Bearer ${memoryAccessToken}`;
      response = await fetch(fullUrl, options);
    } else {
      Cookies.remove("role");
      Cookies.remove("access_token");
      window.location.href = "/auth/login";
    }
  }

  return response;
};