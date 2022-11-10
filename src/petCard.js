/*
import React, { useState, useRef, useEffect } from "react";

export default function Todo({ todo, toggleTodo, editTodo }) {
  const [task, setTask] = useState(todo.name);
  const todoNameRef = useRef();

  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSaveTodo();
    }
  }

  function handleSaveTodo() {
    const rename = todoNameRef.current.value;
    editTodo(todo.id, rename);
    setTask(rename);
  }

  function handleEditTodo() {
    setTask(
      <>
        <input
          type="text"
          ref={todoNameRef}
          defaultValue={todo.name}
          onKeyDown={handleKeyDown}
        ></input>
        <button className="editButton" onClick={handleSaveTodo}>
          save
        </button>
      </>
    );
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={handleTodoClick}
      />
      {task}
      <button className="editButton" onClick={handleEditTodo}>
        edit
      </button>
    </div>
  );
}

*/
