import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
import StorageIcon from "@material-ui/icons/Storage";
import CreateUser from "./AdminSubComponent/CreateUser";
import UploadCSV from "./AdminSubComponent/UploadCSV";
import AllData from "./AdminSubComponent/AllData";
import AllUser from "./AdminSubComponent/AllUser";
import { useHistory } from "react-router-dom";
import UserPanel from "./AdminSubComponent/UserPanel";
import { color } from "../config.json";
import { resetData } from "../action/authAction";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  drawerContainer: {
    color: "#0f458d",
  },
  classList: {
    color: "#0f458d",
  },
  iconColor: {
    color: "#0f458d",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const dispatch = useDispatch();
  let siteAddress = window.location.href;
  let finalUrl = siteAddress.slice(
    siteAddress.lastIndexOf("/") + 1,
    siteAddress.length
  );
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  let history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [fragment, setFragment] = useState(
    finalUrl === "admin" ? "CSV" : "USER_PANEL"
  );

  let loadFragment = () => {
    switch (fragment) {
      case "Create":
        return <CreateUser />;
      case "CSV":
        return <UploadCSV />;
      case "Data":
        return <AllData />;
      case "User":
        return <AllUser />;
      case "USER_PANEL":
        return <UserPanel />;
      default:
        break;
    }
  };

  let handelLogout = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("role");
    dispatch(resetData());
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ background: "#0f458d" }}>
          <Typography variant="h6" noWrap className={classes.title}>
            <Typography variant="h6" noWrap>
              {finalUrl === "admin"
                ? "Data App Admin Panel"
                : "Data App User Panel"}
            </Typography>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {loadFragment()}
      </main>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <h1 style={{ color: "#0f458d" }}>Data App</h1>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <div className={classes.drawerContainer}>
          <List>
            {finalUrl === "user" ? (
              <ListItem
                button
                onClick={() => setFragment("USER_PANEL")}
                className={classes.classList}
              >
                <ListItemIcon className={classes.iconColor}>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="User Data" />
              </ListItem>
            ) : (
              <>
                <ListItem button onClick={() => setFragment("CSV")}>
                  <ListItemIcon className={classes.iconColor}>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Upload CSV" />
                </ListItem>

                <ListItem button onClick={() => setFragment("Create")}>
                  <ListItemIcon className={classes.iconColor}>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create User" />
                </ListItem>
                <ListItem button onClick={() => setFragment("Data")}>
                  <ListItemIcon className={classes.iconColor}>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Data" />
                </ListItem>
                <ListItem button onClick={() => setFragment("User")}>
                  <ListItemIcon className={classes.iconColor}>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Users" />
                </ListItem>
              </>
            )}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handelLogout}>
              <ListItemIcon className={classes.iconColor}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
