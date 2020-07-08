import React from 'react'

const Name = ({item, cross}) => {

  const {name, crossed} = item
  return (
    <li style = {{textDecoration: crossed? "line-through" : "none"}} onClick = {() => cross({...item, crossed: !item.crossed})}>{name}</li>
  )
}

export default Name