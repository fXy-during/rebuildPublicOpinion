import React from "react";
import { ReactDOM } from "react-dom";
import { hashHistory } from "react-router";
import RouteMap from "./router/routeMap";

import { Provider } from "react-redux";

import configureStore from "./store/configureStore";

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RouteMap history={hashHistory} />
  </Provider>
);
