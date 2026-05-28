import api from "./api";
import { customFetch } from "../api-client";
import { getToken } from "./auth";
export async function getQuestions(
  sessionId
) {
  const response = await api.get(
    `/questions/session/${sessionId}`
  );

  return response.data;
}

export async function createQuestion(
  data
) {
  const response = await api.post(
    "/questions",
    data
  );

  return response.data;
}

export async function upvoteQuestion(
  id
) {
  const response = await api.patch(
    `/questions/${id}/upvote`
  );

  return response.data;
}
export async function deleteQuestion(
  id
) {
  const response = await customFetch(
    `/questions/${id}`,
    {
      method: "DELETE",
    }
  );

   if (!response.ok) {
    throw new Error(
      "Erreur suppression question"
    );
  }
console.log(response.status);
  return true;
}