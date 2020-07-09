import React from 'react'
import {connect} from 'react-redux'
import { API_ROOT, HEADERS } from '../constants/api';

const Name = ({names, editName, item}) => {

  const cross = (item) => {
    const name = {
      id: item.id,
      crossed: item.crossed,
      list: item.list
    }

    fetch(`${API_ROOT}/name`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({name})
    })
    .then(() => editName(item))
  }

  const {name, crossed} = item

  return (
    <li style = {{textDecoration: crossed? "line-through" : "none"}} onClick = {() => cross({...item, crossed: !crossed})}>{name}</li>
  )
}

const mapStateToProps = (state) => {
  return {names: state.namesReducer.names}
}

const mapDispatchToProps = (dispatch) => {
  return {
    editName: ((name) => dispatch({type: "editName", name: name}))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Name)