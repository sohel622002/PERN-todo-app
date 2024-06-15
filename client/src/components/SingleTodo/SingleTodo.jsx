import React, { useRef, useState } from "react";
import { updateTodo } from "../../utils/updateTodo";
import { deleteTodo } from "../../utils/deleteTodo";

export default function SingleTodo({ todo, setTodos }) {
  const model = useRef(null);
  const [updatedTodo, setUpdatedTodo] = useState(todo.description);

  const handleUpdateTodo = async () => {
    const data = { ...todo, description: updatedTodo };
    const res = await updateTodo(data);
    setTodos((prevData) =>
      prevData.map((t) => {
        if (t.todo_id === todo.todo_id) {
          return { ...t, description: updatedTodo };
        } else {
          return t;
        }
      })
    );
    model.current.close();
  };

  const deleteTodoHandler = async () => {
    const res = await deleteTodo(todo.todo_id);
    setTodos((prevData) =>
      prevData.filter((t) => {
        if (t.todo_id !== todo.todo_id) {
          return { ...t, description: updatedTodo };
        }
      })
    );
    console.log(res);
  };

  return (
    <>
      <div className="todo">
        <p>{todo.description}</p>
        <div>
          <button
            onClick={() => model.current.showModal()}
            className="btn-info"
          >
            Update
          </button>
          <button className="btn-danger" onClick={deleteTodoHandler}>
            Delete
          </button>
        </div>
      </div>
      <dialog ref={model} className="modal">
        <div className="modal_header">
          <h2>Update Todo!</h2>
          <button onClick={() => model.current.close()} className="btn-danger">
            close
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter todo"
          value={updatedTodo}
          onChange={(e) => setUpdatedTodo(e.target.value)}
        />
        <div className="update">
          <button className="btn-success" onClick={handleUpdateTodo}>
            Update
          </button>
        </div>
      </dialog>
    </>
  );
}
