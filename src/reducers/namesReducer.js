const initialNames = {names: []}

const namesReducer = (state = initialNames,action) => {

  switch(action.type){
      case "setNames":
          return {names: action.names}
      default:
          return state
  }

}

export default namesReducer