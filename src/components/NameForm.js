import React, {useState} from 'react'
import { API_ROOT, HEADERS } from '../constants/api';

const NameForm = ({list}) => {

  const [name, changeName] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/names`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({name,list})
    })
      .then(resp => resp.json())
      .then(json => {
        if(json.errors){
          setError(json.errors.base[0])
        }
        else{
          changeName("")
        }
      })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {error? <label>{error}</label> : null}
      <label htmlFor="name">New Name:</label>
      <input value = {name} onChange = {(e) => changeName(e.target.value)}/>
      <input type="submit" value="Submit"/>
    </form>
  )
  
}

export default NameForm