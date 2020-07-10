import namesReducer from './namesReducer'
import sortingCriteriaReducer from './sortingCriteriaReducer'
import sortingOrderReducer from './sortingOrderReducer'
import {combineReducers} from "redux"


const rootReducer = combineReducers({namesReducer, sortingCriteriaReducer, sortingOrderReducer})


export default rootReducer