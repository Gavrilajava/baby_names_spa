const initialSorting = {criteria: "name"}

const sortingCriteriaReducer = (state = initialSorting,action) => {

  switch(action.type){
      case "changeCriteria":
          return {criteria: action.criteria}
      default:
          return state
  }

}

export default sortingCriteriaReducer