import Cookies from "js-cookie";

export const postTodo = async (todo) => {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: Cookies.get("token"),
      },
      body: JSON.stringify({ description: todo }),
    });
    if (!response.ok) throw new Error("POST todo failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
