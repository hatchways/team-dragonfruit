import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Balance from "./pages/Balance";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from "./hocs/PublicRoute";
import AuthProvider from "./context/AuthContext";
import NotificationProvider from "./context/NotificationContext";
import OnboardingPage from "./pages/OnboardingPage";
import EditProfile from "./pages/EditProfile.js";
import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<NotificationProvider>
				<AuthProvider>
					<BrowserRouter>
						<Switch>
							<PublicRoute path="/signup" component={Signup} />
							<PublicRoute path="/login" component={Login} />
							<PrivateRoute path="/" exact component={Profile} />
							<PrivateRoute path="/balance" component={Balance} />
							<PrivateRoute path="/checkout" component={Checkout} />
							<PrivateRoute path="/reviews" exact component={Reviews} />
							<PrivateRoute path="/edit" exact component={EditProfile} />
							<PrivateRoute path="/onboarding" exact component={OnboardingPage} />
						</Switch>
					</BrowserRouter>
				</AuthProvider>
			</NotificationProvider>
		</MuiThemeProvider>
	);
}

export default App;
