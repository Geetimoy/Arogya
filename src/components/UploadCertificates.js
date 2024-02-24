import { useState } from 'react';

import Appfooter from "./AppFooter";
import InnerAppTop from "./InnerAppTop";

import { MAX_CERTICATE_UPLOAD } from './util/Constants';

import './UploadCertificates.css'

function UploadCertificates(){

  const uploadCertificateChange = (elem) => {
    console.log(elem);
  };
  
  return(
    <>
    <InnerAppTop></InnerAppTop>
    <div className="app-body upload-certifiate">
      <div className='d-flex justify-content-between align-items-center'><h5>Upload Certificates </h5><span>Max 5 files, 500 KB each</span></div>
      <div className="upload-certificate-list">
        <div className="rounded jumbotron p-3 mt-3 mb-3">

          {[...Array(MAX_CERTICATE_UPLOAD)].map((e, i) => <div key={i+1} className="form-group brdr-btm parent">
            <input type="file" name={`certificate_${i+1}`} id={`certificate_${i+1}`} onChange={() => uploadCertificateChange('certificate_'+(i+1))}/>
            <label>Upload Certificate {i+1}</label>
            <span className="close float-end">&#10006;</span>
          </div>)}

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

export default UploadCertificates;