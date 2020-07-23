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
  logo: { height: "3em" },
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
            <Tabs
              className={classes.tabContainer}
              value={value}
              onChange={handleChange}
            >
              <Tab
                label='Home'
                className={classes.tab}
                component={Link}
                to='/'
              />
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
              {/* <MenuItem
                onClick={() => {
                  handleClose();
                  setValue(3);
                }}
                component={Link}
                to='/project1'
                classes={{ root: classes.menuItem }}
              >
                Project 1
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setValue(3);
                }}
                component={Link}
                to='/project2'
                classes={{ root: classes.menuItem }}
              >
                Project 2
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setValue(3);
                }}
                component={Link}
                to='/project3'
                classes={{ root: classes.menuItem }}
              >
                Project 3
              </MenuItem> */}
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
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
