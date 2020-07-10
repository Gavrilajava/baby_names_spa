import React from 'react'

const Select = ({options, onChange, active, title, label }) => {

  return(
    <>
      <label htmlFor={title}>{label}</label>
      <select 
        name={title} 
        onChange={(e) => onChange(e.target.value)}
        value= {active}
        >
        {options.map(option => <option key = {option} value={option}>{option}</option>)}
      </select>
    </>
  )
}

export default Select