import React, { useEffect, useState } from "react";
import SingleTodo from "../SingleTodo/SingleTodo";
import { getTodos } from "../../utils/getTodos";
import { postTodo } from "../../utils/postTodo";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const description = new FormData(e.target).get("description");
    const [response] = await postTodo(description);
    delete response.user_id;
    const updatedTodo = [...todos, response];
    console.log(updatedTodo);
    setTodos(updatedTodo);
    e.target.reset();
    // console.log(response);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <form className="todo_form" onSubmit={handleAddTodo}>
        <input type="text" placeholder="Enter todo" name="description" />
        <button type="submit" className="btn-success">
          ADD
        </button>
      </form>
      <div className="all-todos">
        <h3>All Todos</h3>
        <div className="todos">
          {todos &&
            todos.map((todo) => (
              <SingleTodo key={todo.id} todo={todo} setTodos={setTodos} />
            ))}
        </div>
      </div>
    </div>
  );
}
