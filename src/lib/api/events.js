export const getEventById = async (id) => {
  let response;

  try {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        success: true,
        event: data,
      };
    }

    return {
      status: response.status,
      success: false,
      message: data.message || "Something went wrong",
    };
  } catch {
    return {
      status: response ? response.status : 500,
      success: false,
      message: "Cannot connect to the server",
    };
  }
};