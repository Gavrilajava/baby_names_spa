import React,  {useState, useEffect} from 'react'
import { API_ROOT, HEADERS } from '../constants/api';
import { useHistory, useLocation } from 'react-router-dom';
import Name from './Name'
import NameForm from './NameForm'
import Select from './Select'
import { ActionCableConsumer } from 'react-actioncable-provider';
import {connect} from 'react-redux'


const List = ({names, setNames, addName, criteria, changeCriteria}) => {

  let location = useLocation()

  const [list, setList] = useState(location.search ? location.search.slice(9): location.search)

  // const [criteria, changeCriteria] = useState("name")

  const [order, changeOrder] = useState("ascending")

  const history = useHistory()


  useEffect(()=> {
      if (!list.length){
      // 1. ask to create a list 
      fetch(`${API_ROOT}/list`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({message: "Dear backend, would you please create a list for me"})
      })
        .then(resp => resp.json())
        .then(json => setList(json.list))
      }
      else if (location.search === "") {
        // 2. if list exist change the url
        history.push(`/?list_id=${list}`)
      }
      else if(names.length === 0){
        // 3. and finally, get the initial names
        fetch(`${API_ROOT}/names/${list}`)
          .then(resp => resp.json())
          .then(json => {setNames(json.names)})
      }
      
    }, [])

  const handleReceived = name => addName(name)
  
  const sortedNames = () => names.sort((a,b) => order === 'ascending' ? compareNames(a,b) : compareNames(b,a))
  
  const compareNames = (a,b) => isNaN(a[criteria]) ? a[criteria].localeCompare(b[criteria]) : a[criteria] - b[criteria]


  console.log('rendered')
  return (
    <div className = "container">
    {list !== ""
    ? 
      <>
        <ActionCableConsumer
          channel={{channel: 'NamesChannel', list: list}}
          onReceived={handleReceived}
        />
        <h1>This is your list, sir:</h1>
        {names.length > 2 
          ? <>
              <Select 
              options={Object.keys(names[0])} 
              onChange = {changeCriteria}
              active = {criteria}
              name = "sort"
              label = "Sort by:"
              /> 
              <Select 
              options={['ascending', 'descending']} 
              onChange = {changeOrder}
              active = {order}
              name = "order"
              label = "Order:"
              /> 
            </>
          : null}
        <NameForm list = {list}/>
        <label>Name{criteria === "name" ? null : ` - ${criteria}` }</label>
        <ul>
          {sortedNames().map(item => <Name key = {item.id} item={item}/>)}
        </ul>
      </>
    : <h1> "Wait a second ..." </h1>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    names: state.namesReducer.names,
    criteria: state.sortingCriteriaReducer.criteria
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNames: ((names) => dispatch({type: "setNames", names: names})),
    addName: ((name) => dispatch({type: "addName", name: name})),
    changeCriteria: ((criteria) => dispatch({type: "changeCriteria", criteria: criteria}))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(List)