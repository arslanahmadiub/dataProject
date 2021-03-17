import { combineReducers } from "redux";
import { allDataReducer } from "./allDataReducer";

export default combineReducers({
  allData: allDataReducer,
});
