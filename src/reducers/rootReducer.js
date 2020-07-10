import namesReducer from './namesReducer'
import sortingCriteriaReducer from './sortingCriteriaReducer'
import {combineReducers} from "redux"


const rootReducer = combineReducers({namesReducer, sortingCriteriaReducer})


export default rootReducer