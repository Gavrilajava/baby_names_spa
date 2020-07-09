import namesReducer from './namesReducer'
import {combineReducers} from "redux"



const rootReducer = combineReducers({namesReducer})
// in cace there will be more reducers in the future, just separate them from the begining

export default rootReducer