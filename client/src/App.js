import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Navbar from "./pages/Navbar";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<div>
					<Navbar />
					{/* <Route path="/" component={LandingPage} /> */}
					<Route path="/users/profile" exact component={Profile} />
				</div>
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
