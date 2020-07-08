import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Balance from "./pages/Balance";


import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<div>
					{/* <Route path="/" component={LandingPage} /> */}
					<Route path="/profile" exact component={Profile} />
					<Route path="/reviews" exact component={Reviews} />
					<Route path="/balance" exact component={Balance} />
					
				</div>
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
