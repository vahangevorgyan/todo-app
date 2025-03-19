import { useEffect, useState } from "react";
import "./App.css";
import ConfettiExplosion from "react-confetti-explosion";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isExploding, setIsExploding] = useState(false);

  const randomIDGenerator = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  useEffect(() => {
    const loadTodos = () => {
      const todos = JSON.parse(localStorage.getItem("todos"));
      if (todos) {
        setTodos(todos);
      }
    };
    loadTodos();
  }, []);

  const addTodo = () => {
    if (todoInput.length <= 0) {
      return;
    }
    const newTodo = {
      id: randomIDGenerator(),
      name: todoInput,
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
    setTodoInput("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setIsExploding(false);
    setTimeout(() => {
      setIsExploding(true);
    }, 0);
  };

  const disableExploding = () => {
    setIsExploding(false);
  };

  return (
    <div className="App">
      {isExploding && (
        <ConfettiExplosion
          width={1000}
          force={0.6}
          particleCount={80}
          duration={2500}
          onComplete={() => {
            disableExploding();
          }}
        />
      )}
      <div className="container">
        <div className="header-container">
          <h1 className="header">ToDo List App</h1>
        </div>

        <div className="todo-list-form">
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button className="todo-button" onClick={addTodo}>
            Add
          </button>
        </div>
        <br />
        <hr className="divider" />
        {todos?.map((todo) => (
          <div key={todo.id} className="todo-item">
            <p className="todo-title">{todo?.name}</p>
            <button className="todo-button" onClick={() => deleteTodo(todo.id)}>
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
