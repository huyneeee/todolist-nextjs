import { combineReducers } from "redux";
import todo from "@redux/slices/todo";
import counter from "@redux/slices/counter";

const rootReducer = combineReducers({ counter, todo });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
