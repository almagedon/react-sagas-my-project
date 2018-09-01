import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushSelected } from 'redux/actions/app';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 620,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabDelete: {
    position: 'absolute',
    bottom: theme.spacing.unit * 11,
    right: theme.spacing.unit * 2,
  },
});

@connect(state => ({
  allFiles: state.app.get('files'),
  allFileSelected: state.app.get('selected'),
}))

class DropTable extends Component{
  static propTypes = {
    allFileSelected: PropTypes.array,
    allFiles: PropTypes.array,
    dispatch: PropTypes.func,
  }
  constructor(props){
    super(props);
    this.state = {
      selected:[],
    }
  }
  handleClick = (event, index) => {
    const { dispatch, allFileSelected } = this.props;
    const { selected } = this.state;
    const selectedIndex = allFileSelected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(allFileSelected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(allFileSelected.slice(1));
    } else if (selectedIndex === allFileSelected.length - 1) {
      newSelected = newSelected.concat(allFileSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        allFileSelected.slice(0, selectedIndex),
        allFileSelected.slice(selectedIndex + 1),
      );
    }
    dispatch(pushSelected(newSelected));
    //console.log(newSelected)
    this.setState({ selected: newSelected});
  };

  handleSelectAllClick = (event, checked) => {
    const { dispatch, allFiles, allFileSelected } = this.props;
    
    let selected = this.state.selected.map((e, i)=> i);
    let selectedRedux = allFiles.map((e, i)=> i);
    
    if (checked) {
      dispatch(pushSelected(selectedRedux));
      return;
    }
    dispatch(pushSelected([]));
  };

  isSelected = index => this.props.allFileSelected.indexOf(index) !== -1;
  
  render(){
    const { 
      classes,
      dropActive,
      dropDelete,
      dropzoneRef,
      onSelectAllClick,
      allFiles,
      allFileSelected,
    } = this.props;
    const numSelected = allFileSelected.length;
    const rowCount = allFiles.length;
    return (
      <div>
      <Paper className={'tables '+classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell >#</TableCell>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 & numSelected < rowCount ? true:false}
                  checked={numSelected === rowCount ? 'true':false}
                  onChange={this.handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell numeric>Size</TableCell>
              <TableCell numeric>Type</TableCell>
              <TableCell>Preview</TableCell>
            </TableRow>
          </TableHead>
          {allFiles.length > 0 &&
            <TableBody>
            {allFiles.map((row, index) => {
              const isSelected = this.isSelected(index);
              return (
                <TableRow 
                  key={index}
                  hover
                >
                  <TableCell numeric>{index+1}</TableCell>
                  <TableCell padding="checkbox">
                  <Checkbox 
                    checked={isSelected} 
                    onClick={event => this.handleClick(event, index)}
                  />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell numeric>{row.size}</TableCell>
                  <TableCell numeric>{row.type}</TableCell>
                  <TableCell >{row.preview}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          }
        </Table>
         <Button onClick={() => { dropActive()}} variant="fab" className={classes.fab} color='primary'>
            <AddIcon/>
          </Button>
         <Button onClick={() => { dropDelete()}} variant="fab" className={classes.fabDelete} color='secondary'>
            <DeleteIcon/>
          </Button>
      </Paper>
      </div>
    );
  }
}
DropTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DropTable);