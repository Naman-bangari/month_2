import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
function Home() {
const[todos,settodos]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/get')
    .then(result=>settodos(result.data))
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
      <h1>Todo List</h1>
      <Create/>
      {
        todos.length===0?
        <div>no record</div>
        :
        todos.map(todo=>(
            <div>
                {todo.task}
            </div>
        ))
      }
    </div>
  )
}

export default Home
