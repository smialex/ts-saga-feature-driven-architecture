import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Home";

export const Pages : FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home}/>
    </Switch>
  )
};
