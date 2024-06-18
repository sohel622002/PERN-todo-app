

export const updateTodo = async (todo) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Update todo failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
