import { useEffect, useState } from "react";
import "./App.css";

const fetchUrl = "http://localhost:5000/todos";

function Todo({ todos, setTodos }) {

  const handleRemoveTodo = async (id) => {
    const res = await fetch(fetchUrl + "/" + id, {
      method : "DELETE"
    })
    if(res.ok){
      const updatedTodo = todos.filter(todo => todo.todo_id != id)
      console.log(updatedTodo)
      setTodos(updatedTodo)
    }
  }

  const handleUpdateTodo = async (id) => {
    const description = prompt()
    const res = await fetch(fetchUrl + "/" + id, {
      method : "PUT",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify({ description })
    })
    if(res.ok){
      const dupTodo = [...todos]
      dupTodo.forEach(todo => {
        if(todo.todo_id == id){
          todo.description = description
        }
      })
      setTodos(dupTodo)
    }
  }

  return (
    <div className="all-todos">
      {todos.map((todo) => (
        <div key={todo.todo_id} className="todo">
          <h1 onClick={() => handleUpdateTodo(todo.todo_id)}>{todo.description}</h1>
          <span onClick={() => handleRemoveTodo(todo.todo_id)}>&#9746;</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const description = formData.get("description");

    const res = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    const data = await res.json()

    if (res.ok) {
      setTodos((pre) => [...pre, data])
    }
  };

  return (
    <div className="App">
      <div className="todos">
        <h1>Todos</h1>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="description" />
          <button>Add</button>
        </form>
        <Todo todos={todos} setTodos={setTodos}/>
      </div>
    </div>
  );
}

export default App;
