import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	typography: {
		fontFamily: '"Roboto"',
		fontSize: 12,
		h1: {
			// could customize the h1 variant as well
		},
	},
	palette: {
		primary: { main: "#6E3ADB" },
		secondary: { main: "#501CBD" },
		turquoise: { main: "#43DDC1", light: "#7ce2d0" },
		yellow: { main: "#F7B500" },
	},
});
