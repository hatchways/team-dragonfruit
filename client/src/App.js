import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Balance from "./pages/Balance";

import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Balance from "./pages/Balance";
import Checkout from "./pages/Checkout";

import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from "./hocs/PublicRoute";

import AuthProvider from "./context/AuthContext";

import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<AuthProvider>
				<BrowserRouter>
					<Switch>
						<PublicRoute path="/signup" component={Signup} />
						<PublicRoute path="/login" component={Login} />
						<PrivateRoute path="/" exact component={Profile} />
						<PrivateRoute path="/balance" component={Balance} />
						<PrivateRoute path="/checkout" component={Checkout} />
						<Route path="/reviews" exact component={Reviews} />
						<Route path="/upload" exact component={Upload} />
						<Redirect to="/" />
					</Switch>
				</BrowserRouter>
			</AuthProvider>
		</MuiThemeProvider>
	);
}

export default App;
