import Cookies from "js-cookie";

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        token: Cookies.get("token"),
      },
    });
    // const response = await apiClient("/todos/${id}");
    if (!response.ok) throw new Error("Delete todo failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
