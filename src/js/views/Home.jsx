import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increment } from 'redux/actions/file';

import LogoSvg from 'svg/logo.svg';
import Dropzone from 'components/dropzone';
import 'App.css';

const styles = theme => ({
  card: {
    width: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

@connect(state => ({
    counter: state.get('persist'),
}))


class App extends Component {
    static propTypes = {
    counter: PropTypes.number,
    dispatch: PropTypes.func,
  }
  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <div className="App">
        <br/>
      <Button variant="outlined" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Dropzone />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);