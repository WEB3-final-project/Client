import api from "./api";
export async function getRooms() {
  const response = await api.get(
    `/rooms/`
  );

  return response.data;
}
