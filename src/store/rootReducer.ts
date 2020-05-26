import { combineReducers } from "redux";
import { featuresReducer } from "../features";
import { commonReducers } from "./modules";

const rootReducer = combineReducers({
  features: featuresReducer,
  common: commonReducers,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
