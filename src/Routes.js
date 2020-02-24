import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/loginForm";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>

    <BrowserRouter>
        <Switch>
            <UnauthenticatedRoute path="/login" exact component={LoginForm} props={childProps} />
            <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
            <AuthenticatedRoute path="/home" exact component={Home} props={childProps} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>