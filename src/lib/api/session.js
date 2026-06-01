import api from "./api";
import { getToken } from "./auth";
import { customFetch } from "../api-client";
export async function getSessions() {
  const response = await api.get(
    "/sessions"
  );

  return response.data;
}

export async function getLiveSessions() {
  const response = await api.get(
    "/sessions/live"
  );

  return response.data;
}

export async function getSession(id) {
  const response = await api.get(
    `/sessions/${id}`
  );

  return response.data;
}

export async function getSessionsByRoom(
  roomId
) {
  const response = await api.get(
    `/sessions/room/${roomId}`
  );

  return response.data;
}
export async function createSession(data) {
  const response = await customFetch(
  "/sessions",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response.data;
  
}
export async function updateSession(id,data) {
  const response = await customFetch(
  `/sessions/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
  return response.data;
  
}
export async function deleteSession(
  id
) {
  const response = await customFetch(
    `/sessions/${id}`,
    {
      method: "DELETE",
    }
  );
  return response.data;
}

