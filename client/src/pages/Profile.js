import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import Navbar from "./Navbar";
import ProjectCard from "../utilities/ProjectCard";
import project1 from "../../src/images/project1.png";
import project2 from "../../src/images/project2.png";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: "white",
		margin: theme.spacing(15),
	},
	header: {
		height: "150px",
		padding: "30px",
		borderBottom: "1px solid #eee",
	},
	subtitle: {
		color: theme.palette.text.secondary,
	},
	number: {
		fontWeight: "bold",
	},
	summary: {
		borderBottom: "1px solid #eee",
		height: "150px",
		padding: "50px",
	},
	projects: {
		padding: "30px",
	},
}));

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div>
			<Navbar />
			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item container>
						<Grid item xs={12} className={classes.header}>
							<Typography variant="h4" align="center">
								John Doe
							</Typography>
							<Typography
								variant="subtitle1"
								align="center"
								className={classes.subtitle}>
								Senior Developer at Google
							</Typography>
						</Grid>

						<Grid item container xs={12} className={classes.summary}>
							<Grid item xs={4}>
								<Typography
									variant="h4"
									align="center"
									color="primary"
									className={classes.number}>
									5
								</Typography>
								<Typography variant="subtitle1" align="center">
									years of experience
								</Typography>
							</Grid>

							<Grid item xs={4}>
								<Typography
									variant="h4"
									align="center"
									color="primary"
									className={classes.number}>
									24
								</Typography>
								<Typography variant="subtitle1" align="center">
									reviews
								</Typography>
							</Grid>

							<Grid item xs={4}>
								<Typography
									variant="h4"
									align="center"
									color="primary"
									className={classes.number}>
									4.8
								</Typography>
								<Typography variant="subtitle1" align="center">
									rating
								</Typography>
							</Grid>
						</Grid>

						<Grid
							item
							container
							xs={12}
							className={classes.projects}
							spacing="3"
							justify="center">
							<Grid item xs={12}>
								<Typography variant="h4" align="center">
									Projects
								</Typography>
							</Grid>

							<Grid item>
								<ProjectCard src={project1} />
							</Grid>
							<Grid item>
								<ProjectCard src={project2} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
