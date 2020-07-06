import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Navbar from "./pages/Navbar";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Balance from "./pages/Balance";
import Upload from "./pages/Upload";

import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<div>
					<Navbar />
					{/* <Route path="/" component={LandingPage} /> */}
					<Route path="/users/profile" exact component={Profile} />
					<Route path="/users/reviews" exact component={Reviews} />
					<Route path="/users/balance" exact component={Balance} />
					<Route path="/users/upload" exact component={Upload} />
				</div>
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
