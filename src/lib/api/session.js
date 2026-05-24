import api from "./api";

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