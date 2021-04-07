import React from 'react';
import {Modal} from 'react-bootstrap';

function errorModel(props) {  
  const {show , handleClose} = props;
    return (
      <Modal
      show={show}
      onHide={handleClose} 
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Body>
        <div  className="swal2-popup swal2-modal swal2-show" style={{display: 'flex',paddingLeft: '20px',  padding:'1rem', paddingRight: '0px'}}>
            <div className="swal2-header">
                <div className="swal2-icon swal2-error swal2-animate-error-icon" style={{display: 'flex'}}>
                    <span className="swal2-x-mark">
                        <span className="swal2-x-mark-line-left" />
                        <span className="swal2-x-mark-line-right" />
                    </span>
                </div>
              </div>
            <div className="swal2-content">
                <div id="swal2-content" style={{display: 'block'}}>There are some errors in your submission. Please correct them.</div>               
            </div>
            <div className="swal2-actions" style={{display: 'flex'}}>
                <button type="button" 
                onClick={handleClose}
                className="swal2-confirm btn btn-secondary swal2-styled"  
                style={{display: 'inline-block', borderLeftColor: 'rgb(48, 133, 214)', borderRightColor: 'rgb(48, 133, 214)'}}>OK</button>
            </div>
            </div>
        </Modal.Body>
    </Modal>
    );
  }


  export default errorModel;