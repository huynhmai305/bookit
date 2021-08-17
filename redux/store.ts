import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/reducers";

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    return nextState;
  } else {
    return reducers(state, action);
  }
};

const initStore = () => {
  return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore, {
  debug: process.env.NODE_ENV === "development",
});
export type RootState = ReturnType<typeof rootReducer>;
