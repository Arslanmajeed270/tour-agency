import React, { Component } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';



export default class Form3 extends Component {

    // specify upload params and url for your files
    // getUploadParams = ({ meta }) => { 
    //     console.log("Meta Checking: ", meta);
    //   return { url: 'https://httpbin.org/post' } 
    
    // }
    
    // called every time a file's `status` changes
     handleChangeStatus = ({ meta, file }, status) => {
       
      console.log("Checking handleChangeStatus status ",status);
      // console.log("Checking handleChangeStatus  Meta", meta);
      // console.log("Checking handleChangeStatus file ",file);

      if(status === 'done' || status === 'removed'){
        this.props.onChangeHandler(status, file);
      }
    }
    
    // receives array of files that are done uploading when submit button is clicked
    //  handleSubmit = (files, allFiles) => {

    //   console.log("into handleSubmit: ", files.map(f => f.meta));
    //   allFiles.forEach(f => f.remove());
    // }

    render() {
     const  {edit, images} = this.props;
     const backendServerURL = process.env.REACT_APP_API_URL;
        return (
          <div className="kt-wizard-v1__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
  <div className="kt-heading kt-heading--md">Upload Product Images</div>
  <div className="kt-form__section kt-form__section--first">
    <div className="kt-wizard-v1__form">
      <div className="col-xl-12">
        <div className="form-group">
          <label>You can upload multiple images for a product</label>
        </div>
      </div>										
      <div className="form-group row">
        <label className="col-form-label">Upload a New File</label>
        <div className="col-lg-12 col-md-12 col-sm-12">

         {/* dropzone start here */}
         <Dropzone
          // getUploadParams={this.getUploadParams}
          onChangeStatus={this.handleChangeStatus}
          // onSubmit={this.handleSubmit}
          accept="image/*"
      />  

        </div>
      </div>
      
      { edit  && 
    <div className="table-responsive">
    <table className="table table-striped table-bordered table-hover table-checkable" id="files_table">
      <thead>
        <tr>
          <th>Image</th>
          <th>image Name</th>
          <th><center> Actions </center> </th>
        </tr>
      </thead>
      <tbody>
        {images && images.length ? images.map((image,idx) => (
          <tr  key={idx}>
          <td valign="top" className="text-center">
            <span className="kt-header__topbar-icon">
              <img src={`${backendServerURL}/images/${image}`} alt={image} style={{width: '30px'}} />
            </span>
          </td>
          <td>
            <a href={`${backendServerURL}/images/${image}`} target="blank">
              {image}
            </a>
          </td>
          <td>
            <center>
            <div  className="reportissue btn btn-danger btn-sm" onClick={() => this.props.imgRemoveHandler(idx)}><i className="flaticon-delete flaticon-size text-white" /> Delete</div>
            </center>
          </td>
        </tr>
        ))
        :
        <tr>
          <td colSpan="3">No image found</td>
        </tr>
       
          
        }
        
      </tbody>
    </table>   
    </div>

          }
        
        </div>
      </div>
    </div>

          
          



        )
    }
}
