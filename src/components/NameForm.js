import React, {useState} from 'react'
import { API_ROOT, HEADERS } from '../constants/api';
import {connect} from 'react-redux'

const NameForm = ({list, setNames}) => {

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
          setNames(json)
          changeName("")
        }
      })
  }

  const handleChange = e => {
    changeName(e.target.value)
    setError(null)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {error? <label style = {{color: "red"}}>{error}</label> : null}
      <label htmlFor="name">New Name:</label>
      <input value = {name} onChange = {handleChange}/>
      <input type="submit" value="Submit"/>
    </form>
  )
  
}


const mapStateToProps = (state) => {
  return {
    names: state.namesReducer.names,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNames: ((names) => dispatch({type: "setNames", names: names}))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NameForm)