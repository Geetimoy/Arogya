import { useState } from 'react';

import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './UploadCertificate.css'

function UploadCertificate(){

 
  
  return(
    <>
    <AppTop></AppTop>
    <div className="app-body upload-certifiate">
      <h5>Upload Certificate</h5>
      <div className="upload-certificate-list">
        <div className="rounded jumbotron p-3 mt-3 mb-3">
          <div className="form-group brdr-btm parent">
            <input type="file" name="" id="" className="" />
            <label>Upload Certificate 1</label>
            <span className="close float-end">&#10006;</span>
          </div>
          <div className="form-group brdr-btm parent">
            <input type="file" name="" id="" className="" />
            <label>Upload Certificate 2</label>
            <span className="close float-end">&#10006;</span>
          </div>
          <div className="form-group brdr-btm parent">
            <input type="file" name="" id="" className="" />
            <label>Upload Certificate 3</label>
            <span className="close float-end">&#10006;</span>
          </div>
          {/* <div className="form-group">
          <button type="button" id="" name="" class="btn btn-primary primary-bg-color border-0 mx-2">Update Photo<input type="file" name="cover" accept="img/*" style={{ display: "none" }} /></button>
          </div> */}
        </div>
      </div>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default UploadCertificate;