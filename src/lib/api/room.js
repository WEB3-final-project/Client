import api from "./api";
import { customFetch } from "../api-client";
import { getToken } from "./auth";
export async function getRooms() {
  const response = await api.get(
    `/rooms/`
  );

  return response.data;
}
export async function getRoom(id) {
  const response = await api.get(
    `/rooms/${id}`
  );
  return response.data;
}

export async function createRoom(
  data
) {
  const response = await customFetch(
    "/rooms",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response.data;
}

export async function updateRoom(
  id,
  data
) {
  const response = await customFetch(
    `/rooms/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),

    }
  );
  return response.data;
}
export async function deleteRoom(
  id
) {
  const response = await customFetch(
    `/rooms/${id}`,
    {
      method: "DELETE",
    }
  );
  return response.data;
}
