import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import { NotificationContext } from "../context/NotificationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: theme.palette.secondary.main,
    width: 40,
    height: 40,
    textAlign: "center",
  },
  shapeCircle: {
    borderRadius: "50%",
  },
  icon: {
    color: "white",
    fontSize: "large",
    //??** How can I center the bell icon properly??**//
  },
}));

export default function BadgeOverlap() {
  const classes = useStyles();

  const { notificationMsg } = useContext(NotificationContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log("ABC", notificationMsg);

  return (
    <div className={classes.root}>
      <Badge
        color='secondary'
        overlap='circle'
        badgeContent=''
        variant='dot'
        onClick={handleClick}
      >
        <div className={clsx(classes.shape, classes.shapeCircle)}>
          <IconButton>
            <NotificationsNoneIcon className={classes.icon} />
          </IconButton>
        </div>
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={notificationMsg.event} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Work' secondary='Jan 7, 2014' />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Vacation' secondary='July 20, 2014' />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
