const initialOder = {order: "ascending"}

const sortingOrderReducer = (state = initialOder,action) => {

  switch(action.type){
      case "changeOrder":
          return {order: action.order}
      default:
          return state
  }

}

export default sortingOrderReducer