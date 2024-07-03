import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import './Home.css'
import iconImg from './Icon/1.png';
function Home() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result=>{
        location.reload();
      })
      .catch(err => console.log(err))
  }

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
        
        setTodos(todos.map(todo => todo._id === id ? { ...todo, done: true } : todo))
        location.reload();
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      

      <h1>Todo List <img src={iconImg} alt="Description of the image" style={{ width: '70px', height: '70px' }} /></h1>
      <Create />
      {
        todos.length === 0 ?
          <div>no record</div>
          :
          todos.map(todo => (
            <div key={todo._id} className="todo-item">
              <input
                type="checkbox"
                className="checkbox"
                checked={todo.done}
                onChange={() => handleEdit(todo._id)}
              />
              <div className={`todo-task ${todo.done ? 'line_through' : ''}`}>
                {todo.task}
              </div>
              <button className="delete-button" onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          ))
      }
    </div>
  )
}

export default Home
