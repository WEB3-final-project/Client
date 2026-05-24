import api from "./api";

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