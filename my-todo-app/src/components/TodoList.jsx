// src/components/TodoList.jsx
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [workTodos, setWorkTodos] = useState([
    { id: 1, text: 'Email', completed: false },
    { id: 2, text: 'Team meeting', completed: false }
  ]);
  
  const [homeTodos, setHomeTodos] = useState([
    { id: 1, text: 'Buy Milk', completed: true },
    { id: 2, text: 'Laundry', completed: false }
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const handleAddTodo = () => {
    if (newItem.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newItem,
        completed: false
      };
      
      if (activeTab === 'work') {
        setWorkTodos([...workTodos, newTodo]);
      } else {
        setHomeTodos([...homeTodos, newTodo]);
      }
      setNewItem('');
    }
  };

  const toggleTodo = (id, isWork) => {
    if (isWork) {
      setWorkTodos(workTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } else {
      setHomeTodos(homeTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    }
  };

  return (
    <div className="todo-container">
      <h1>To Do</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`tab ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          Work
        </button>
      </div>

      <div className="todo-list">
        {(activeTab === 'home' ? homeTodos : workTodos).map(todo => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, activeTab === 'work')}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>

      <div className="add-todo">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="New item"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );
};

export default TodoList;
