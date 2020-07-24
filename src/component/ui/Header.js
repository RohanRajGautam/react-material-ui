import { Toolbar, AppBar, useScrollTrigger, Slide } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/logo.svg";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return <Slide in={!trigger}>{children}</Slide>;
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  toolbarMargin: { ...theme.mixins.toolbar, marginBottom: "2em" },
  [theme.breakpoints.down("sm")]: { marginBottom: "2em" },
  [theme.breakpoints.down("xs")]: { marginBottom: "1em" },

  logo: { height: "3em" },
  [theme.breakpoints.down("sm")]: { height: "5em" },
  [theme.breakpoints.down("xs")]: { height: "4em" },

  tabContainer: { marginLeft: "auto" },
  tab: {
    ...theme.typography.tab,
    minWidth: 5,
    marginLeft: "25px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": { opacity: 1 },
  },

  drawerIconContainer: {
    "&:hover": { backgroundColor: "transparent" },
    marginLeft: "auto",
  },

  drawerIcon: {
    height: "30px",
    width: "30px",
  },

  drawer: { backgroundColor: theme.palette.common.blue },

  drawerItemText: { ...theme.typography.tab, opacity: 0.7 },

  drawerItemTextSelected: { "& .MuiListItemText-root": { opacity: 1 } },

  appbar: { zIndex: theme.zIndex.modal + 1 },
}));

export default function Header(props) {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    { name: "Project 1", link: "/project1", activeIndex: 3, selectedIndex: 0 },
    { name: "Project 2", link: "/project2", activeIndex: 3, selectedIndex: 0 },
    { name: "Project 3", link: "/project3", activeIndex: 3, selectedIndex: 0 },
  ];

  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    { name: "Training", link: "/training", activeIndex: 1 },
    { name: "Skills", link: "/skills", activeIndex: 2 },
    {
      name: "Projects",
      link: "/projects",
      activeIndex: 3,
      ariaOwns: anchorEl ? "projects-menu" : undefined,
      ariaHaspopup: anchorEl ? "true" : undefined,
      mouseOver: (e) => handleClick(e),
    },
    { name: "Contact", link: "/contact", activeIndex: 4 },
  ];

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleChange = (e, val) => {
    setValue(val);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const tabs = (
    <>
      <div className={classes.tabContainer}>
        {routes.map((route) => (
          <Tab
            key={`${route}`}
            className={classes.tab}
            label={route.name}
            component={Link}
            to={route.link}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          ></Tab>
        ))}
      </div>
      <Menu
        anchorEl={anchorEl}
        id='projects-menu'
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        classes={{ paper: classes.menu }}
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            selected={i === selectedIndex && value === 3}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              setValue(3);
              handleClose();
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          <div className={classes.toolbarMargin} />
          {routes.map((route) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelectedText }}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItemText}>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.drawerIconContainer}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, menuOptions, selectedIndex, routes]);

  return (
    <>
      <HideOnScroll>
        <AppBar color='secondary' className={classes.appbar}>
          <Toolbar>
            <Button component={Link} to='/'>
              <img src={logo} alt='logo' className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
