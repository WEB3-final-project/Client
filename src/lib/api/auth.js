"use client";
import { customFetch } from "@/lib/api-client";
import Cookies from 'js-cookie';
import { setAccessToken, getAccessToken,clearAccessToken } from "@/lib/api-client";
export const login = async (formData)=> {
  let response; 
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      setAccessToken(data.access_token);
      Cookies.set("role", data.role, { expires: 1, secure: process.env.NODE_ENV === 'production' });
      Cookies.set("access_token", data.access_token, { expires: 1, secure: process.env.NODE_ENV === 'production' });
      return {status:response.status, success: true};
    }
    return{
      status: response.status,
      success: false,
      message: data.message || "Invalid credentials",
    }
  } catch {
    return { status: response ? response.status : 500, success: false, message: "Can not connect to the server" };
  }
};

export const logout = async() => {
  let response; 
  try {
    response = await customFetch("/auth/logout", {
      method: "DELETE"
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.clear()     
      clearAccessToken();
      Cookies.remove("role");
      Cookies.remove("access_token");
      return {status:response.status, success: true};
    }
    return{
      status: response.status,
      success: false,
      message: data.message || "something went wrong",
    }
  } catch {
    return { status: response ? response.status : 500,success: false, message: "Can not connect to the server" };
  }
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return getAccessToken();
};


export const register = async (formData)=> {
  let response; 
  try {
    const photoUrl = formData.get("photo_url");
    const bio = formData.get("bio");
    const fullName = formData.get("full_name");
    const externalLinks = formData.get("external_links");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    let info = {};
    if (role === "speaker") {
      info = { photoUrl, bio, fullName, externalLinks, email, password, role };
    } else if (role === "participant") {
      info = { fullName, email, password, role };
    }
    response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      return {status: response.status, success: true , message: "Profile successfully created"};
    }
    return {
      status:response.status,
      success: false,
      message: data.message || "something went wrong",
    };
  } catch {
    return {status:response ? response.status : 500, success: false, message: "Can not connect to the server" };
  }
};