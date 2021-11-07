import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {
  Login,
  Main,
  PortfolioDatail,
  PortfolioList,
  SignUp,
  Token,
} from "../components";

const UserRouter = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Main} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/sign-up" component={SignUp} exact />
      <Route path="/portfolio-list" component={PortfolioList} exact />
      <Route path="/portfolio/:id" component={PortfolioDatail} exact />
      <Route path="/login-github" component={Token} exact />
    </BrowserRouter>
  );
};

export default UserRouter;
