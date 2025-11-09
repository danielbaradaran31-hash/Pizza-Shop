import { useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([{ id: 1, text: "Buy a Pizza", status: "no_status" }]);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const statuses = [
    { id: "no_status", title: "No Status", addButton: true },
    { id: "not_started", title: "Not Started" },
    { id: "in_progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ];

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, status: "no_status" }]);
      setInputValue("");
      setShowModal(false);
    }
  };

  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));
  
  const updateTodoStatus = (id, newStatus) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const onDragStart = (e, id) => e.dataTransfer.setData("todoId", id);
  const onDrop = (e, status) => updateTodoStatus(Number(e.dataTransfer.getData("todoId")), status);

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="modal active">
          <div className="header">
            <div className="title">Add Todo</div>
            <button onClick={() => setShowModal(false)}>&times;</button>
          </div>
          <div className="body">
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
          </div>
        </div>
      )}

      {/* Columns */}
      <div className="todo-container">
        {statuses.map(col => (
          <div
            key={col.id}
            className="status"
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, col.id)}
          >
            <h1>{col.title}</h1>
            {col.addButton && <button onClick={() => setShowModal(true)}>+ Add Todo</button>}
            {todos.filter(t => t.status === col.id).map(todo => (
              <div key={todo.id} className="todo" draggable onDragStart={e => onDragStart(e, todo.id)}>
                {todo.text}
                <span className="close" onClick={() => deleteTodo(todo.id)}>&times;</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
