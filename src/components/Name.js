import React from 'react'
import {connect} from 'react-redux'
import { API_ROOT, HEADERS } from '../constants/api';
import Draggable from 'react-draggable';

const Name = ({criteria, item, setNames}) => {

  const update = (item) => {
    const name = {
      id: item.id,
      crossed: item.crossed,
      list: item.list,
      manual: item.manual
    }
    fetch(`${API_ROOT}/name`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({name})
    })
    .then(resp => resp.json())
    .then(json => setNames(json))
  }

  

  const handleStopDrag = (e, data, item) => {
    const manual = parseInt(item.manual) + parseInt(data.y)
    item = {...item, manual: manual}
    update(item)
  }

  const handleClick = () => {
    if (criteria !== "manual"){
      update({...item, crossed: !crossed})
    }
  }

  const {name, crossed} = item

  return (
    <Draggable
      axis="y"
      onStop = {(e, data) => handleStopDrag(e, data, item)}
      disabled= {criteria !== "manual"}
      position = {{x: 0, y: 0}}
    >
      <li 
        style = {{
          textDecoration: crossed? "line-through" : "none",
          height: "20px"
        }} 
        onClick = {handleClick}
      >
        {name + (criteria === "name" ? "" : ` - ${item[criteria]}`)}
      </li>
    </Draggable>
  )
}

const mapStateToProps = (state) => {
  return {
    criteria: state.sortingCriteriaReducer.criteria
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNames: ((names) => dispatch({type: "setNames", names: names}))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Name)