export const getTodos = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Fetch todos failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
