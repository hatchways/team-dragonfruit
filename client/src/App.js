import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import OnboardingPage from "./pages/OnboardingPage";

import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

import Dashboard from "./pages/Dashboard";
import Balance from "./pages/BalancePage";

import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from "./hocs/PublicRoute";

import AuthProvider from "./context/AuthContext";

import SelectLangSam from "./components/select-language/select-language";

import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			{/* <AuthProvider> */}
			<BrowserRouter>
				{/* <PublicRoute path="/signup" component={Signup} />
				<PublicRoute path="/login" component={Login} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/balance" component={Balance} />
				<Route path="/profile" exact component={Profile} />
				<Route path="/reviews" exact component={Reviews} /> */}
				{/* <Route path="/upload" exact component={Upload} /> */}
				<Route path="/onboarding" exact component={OnboardingPage} />
				<Route path="/test" exact component={SelectLangSam} />
			</BrowserRouter>
			{/* </AuthProvider> */}
		</MuiThemeProvider>
	);
}

export default App;
