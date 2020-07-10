import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	image: {
		backgroundSize: "cover",
		height: "200px",
	},
	link: {
		color: "#666",
		textDecoration: "underline",
	},
});

export default function ImgMediaCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardMedia
				component="img"
				height="140"
				image={props.src}
				title="Project"
				className={classes.image}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					Project Title
				</Typography>
				<Link href="#" className={classes.link}>
					<Typography variant="caption">https://websitelink.com</Typography>
				</Link>
			</CardContent>
		</Card>
	);
}
