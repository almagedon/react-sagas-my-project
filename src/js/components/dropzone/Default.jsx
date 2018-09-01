import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    minHeight: 240,
    width: '100%',
    marginTop: 25
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
});

class Default extends React.Component {
  state = {
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={40}
            className={classes.demo}
            alignItems={'stretch'}
            direction={'row'}
            justify={'center'}
          >
            
              <Grid item xs={8}>
              <Grid
                container
                spacing={40}
                className={classes.demo}
                alignItems={'stretch'}
                direction={'row'}
                justify={'center'}
              >
              <Grid item xs={12}>
                <Paper
                  className={classes.paper}
                >
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                  <AttachFileIcon />
                </Button>
                <Grid item xs={12}>
                <br/>
                  <Typography variant="headline" component="h3">
                    Haga click o arraste su archivo hasta aqui.
                  </Typography>
                </Grid>
                </Paper>
                </Grid>
                </Grid>
              </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    );
  }
}

Default.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Default);