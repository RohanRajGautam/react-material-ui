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
  menu: { backgroundColor: theme.palette.common.blue, borderRadius: "0px" },
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
}));

export default function Header(props) {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuOptions = [
    { name: "Project 1", link: "/project1" },
    { name: "Project 2", link: "/project2" },
    { name: "Project 3", link: "/project3" },
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
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={handleChange}
      >
        <Tab label='Home' className={classes.tab} component={Link} to='/' />
        <Tab
          label='Training'
          className={classes.tab}
          component={Link}
          to='/training'
        />
        <Tab
          label='Skills'
          className={classes.tab}
          component={Link}
          to='/skills'
        />
        <Tab
          label='Projects'
          className={classes.tab}
          component={Link}
          to='/projects'
          aria-owns={anchorEl ? "projects-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          onClick={(e) => {
            handleClick(e);
          }}
          onMouseOver={(e) => {
            handleClick(e);
          }}
        />
        <Tab
          label='Contact'
          className={classes.tab}
          component={Link}
          to='/contact'
        />
      </Tabs>
      <Menu
        anchorEl={anchorEl}
        id='projects-menu'
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        classes={{ paper: classes.menu }}
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
          <ListItem
            component={Link}
            to='/'
            divider
            button
            onClick={() => setOpenDrawer(false)}
            classes={{ selected: classes.drawerItemTextSelected }}
          >
            <ListItemText className={classes.drawerItemText}>Home</ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            to='/training'
            divider
            button
            onClick={() => setOpenDrawer(false)}
            classes={{ selected: classes.drawerItemTextSelected }}
          >
            <ListItemText className={classes.drawerItemText}>
              Training
            </ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            to='/skills'
            divider
            button
            onClick={() => setOpenDrawer(false)}
            classes={{ selected: classes.drawerItemTextSelected }}
          >
            <ListItemText className={classes.drawerItemText}>
              Skills
            </ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            to='/projects'
            divider
            button
            onClick={() => setOpenDrawer(false)}
            classes={{ selected: classes.drawerItemTextSelected }}
          >
            <ListItemText className={classes.drawerItemText}>
              Projects
            </ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            to='/contact'
            divider
            button
            onClick={() => setOpenDrawer(false)}
            classes={{ selected: classes.drawerItemTextSelected }}
          >
            <ListItemText className={classes.drawerItemText}>
              Contact
            </ListItemText>
          </ListItem>
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
    let path = window.location.pathname;
    if (path === "/" && value !== 0) setValue(0);
    else if (path === "/training" && value !== 1) setValue(1);
    else if (path === "/skills" && value !== 2) setValue(2);
    else if (path === "/projects" && value !== 3) setValue(3);
    else if (path === "/contact" && value !== 4) setValue(4);
  }, [value]);

  return (
    <>
      <HideOnScroll>
        <AppBar color='secondary'>
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
