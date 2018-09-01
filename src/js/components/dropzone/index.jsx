import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone'
import DropTable from './DropTable'
import Default from './Default'

import { connect } from 'react-redux';
import { pushFiles, pushSelected } from 'redux/actions/app';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  overlayStyle:{
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width:'100%',
    height:'100%',
    zIndex: 10,
    padding: '2.5em 0',
    background: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    color: '#fff'
  }
});

@connect(state => ({
  allFiles: state.app.get('files'),
  allFileSelected: state.app.get('selected'),
}))

class Dropzone extends Component {
  static propTypes = {
    allFiles: PropTypes.array,
    allFileSelected: PropTypes.array,
    dispatch: PropTypes.func,
  }
 constructor() {
    super()
    this.state = {
      accept: '.pdf,.jpg,.png',
      dropzoneActive: false,
      disabled: false,
      dropzoneRef: {}
    }
  }

  onDragEnter = () => {
    this.setState({
      dropzoneActive: true
    });
  }
  dropActive = () => {
    this.setState({
      disabled: false,
      dropzoneActive: false
    },() => this.state.dropzoneRef.open());
  }

  onDragOver = () => {
  }

  onDragLeave = () => {
    this.setState({
      dropzoneActive: false
    });
  }
  dropDelete = () => {
    const { dispatch, allFiles, allFileSelected } = this.props;
    var newFilesAll= [];
    if (allFileSelected.length > 0) { 
      newFilesAll = allFiles.filter((e,i)=> allFileSelected.indexOf(i) === -1)
    }
    dispatch(pushFiles(newFilesAll));
    dispatch(pushSelected([]));
    this.setState({
      dropzoneActive: false,
      disabled: false,
    });
  }
  onDrop = file => {
    const { dispatch, allFiles } = this.props;
    let files = allFiles;
    let newFilesAll = [...files,...file]
    //newFilesAll.map(f => console.table(f))
    dispatch(pushFiles(newFilesAll));
    this.setState({
      dropzoneActive: false,
      disabled: true
    })
    newFilesAll.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileAsBinaryString = reader.result;
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        let preview = reader.readAsBinaryString(file);
    });
  };

  nodeRef = node => {
    this.setState({dropzoneRef:node})
  }
  
  render() {
    const { classes, allFiles } = this.props;
    const bull = <Button onClick={() => {}}>•</Button>;
    return ( 
      <div>
      <DropzoneComponent
        className="dropZone"
        accept={this.state.accept}
        style={{ width: '100%'}}  
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDropAccepted={()=>console.log('archivos permitidos')}
        onDropRejected={()=>alert('archivos no permitidos')}
        disabled={this.state.disabled}
        ref={this.nodeRef}
      >
      { this.state.dropzoneActive && <div className={classes.overlayStyle}>Deje su archivos...</div> }
       { allFiles.length <= 0 &&  <Default />}
      </DropzoneComponent>
      { allFiles.length > 0 && 
        <DropTable 
          dropActive={this.dropActive}
          dropDelete={this.dropDelete} 
          dropDisabled={this.state.disabled} 
          dropzoneRef={this.state.dropzoneRef} 
        />
      }
      </div>
    )  
  }
}

Dropzone.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dropzone);
