import React, { useState } from 'react';
import axios from 'axios'
function Create() {
  const [task,settask]=useState()
  const handleadd =()=>{
    axios.post('http://localhost:3001/add',{task: task})
    .then(result=>{
      location.reload()
    })
    .cacth(err=>console.log(err))
  }
  return (
    <div className="create-container">
      <input type="text" className="custom-input" onChange={(e)=>settask(e.target.value)} />
      <button type="button" onClick={handleadd}>ADD</button>
    </div>
  );
}

export default Create;
