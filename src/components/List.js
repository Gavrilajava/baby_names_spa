import React,  {useState, useEffect} from 'react'
import { API_ROOT, HEADERS } from '../constants/api';
import { useHistory } from 'react-router-dom';
import Name from './Name'
import NameForm from './NameForm'
import { ActionCableConsumer } from 'react-actioncable-provider';


const List = ({history: {location: {search}}}) => {

  const [list, setList] = useState(search? search.slice(9): search)

  const [names, setNames] = useState([])

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
      else if (search === "") {
        // 2. if list exist change the url
        history.push(`/?list_id=${list}`)
      }
      else if(names.length === 0){
        // 3. and finally, get the initial names
        fetch(`${API_ROOT}/names/${list}`)
          .then(resp => resp.json())
          .then(json => setNames(json.names))
      }
      
    }, [list, search, names, history])

  const handleReceived = name => setNames([...names.filter(n => n.id !== name.id), name])
  
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
    .then(() => setNames([...names.filter(n => n.id !== item.id), item]))
  }

  return (
    search.length 
    ? <>
        <ActionCableConsumer
          channel={{channel: 'NamesChannel', list: list}}
          onReceived={handleReceived}
        />
        <NameForm list = {list}/>
        {names.map(item => <Name key = {item.id} item={item} cross = {cross}/>)}
      </>
    : <div> "Wait a second ..." </div>
  )
}

export default List