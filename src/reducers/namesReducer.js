const initialNames = {names: []}

const namesReducer = (state = initialNames,action) => {

  switch(action.type){
      case "setNames":
          return {names: action.names}
      case 'addName':
          return {names: [...state.names, action.name]}
      case 'editName':
            return {names: [
              ...state.names.filter(n => n.id !== action.name.id), 
              action.name
            ]}
      default:
          return state
  }

}

export default namesReducer