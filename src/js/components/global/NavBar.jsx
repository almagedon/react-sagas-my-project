import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/icons/AccessAlarm';
import MenuIcon from '@material-ui/icons/Menu.js';
import SearhcIcon from '@material-ui/icons/Search';

import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import Login from 'components/login';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});


class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          Scan
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
          </Typography>
          <Login/>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <SearhcIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
