import { useState, useContext } from 'react';

import Appfooter from "./AppFooter";

import { MAX_CERTICATE_UPLOAD } from './util/Constants';

import './UploadCertificates.css';

import SystemContext from "../context/system/SystemContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

function UploadCertificates(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const [fileList, setFileList] = useState({});

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const uploadCertificateChange = (event, elem) => {
    setFileList({...fileList, [elem]: event.target.files[0]});
    console.log(fileList);
  };
  
  return(
    <>
      <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>Upload Certificates </h5>
            </div>
            <div className='app-top-right d-flex'> 
              <div className='position-relative'>
                <Link to="/notifications">
                <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
                <span className='top-header-notification primary-bg-color'>3</span>
                </Link>
              </div> 
              <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                  <ul>
                    <li><Link to={"/aboutserviceplace"}>About Service Place</Link></li>
                    {
                      (systemContext.systemDetails.thp_system_id !== 0) && <li><Link to={"/about-ngo"}>About {systemContext.systemDetails.thp_system_name}</Link></li>
                    }
                    <li><Link to={"/contactus"}>Contact Us</Link></li>
                    <li><Link to={"/feedback"}>Feedback</Link></li>
                    <li><Link to={"/help"}>Help</Link></li>
                    <li><Link to={"/logout"}>Logout</Link></li>
                  </ul>
              </div>
            </div>
          </div>
      </div>
      <div className="app-body upload-certifiate">
        <div className='d-flex justify-content-between align-items-center'><h5></h5><span>Max 5 files, 500 KB each</span></div>
        <div className="upload-certificate-list">
          <div className="rounded jumbotron p-3 mt-3 mb-3">
            <form encType="multipart/form-data">
              {[...Array(MAX_CERTICATE_UPLOAD)].map((e, i) => <div key={i+1} className="form-group brdr-btm parent">
                <input type="file" name={`certificate_${i+1}`} id={`certificate_${i+1}`} onChange={(event) => uploadCertificateChange(event, 'certificate_'+(i+1))}/>
                <label>Upload Certificate {i+1}</label>
                <span className="close float-end">&#10006;</span>
              </div>)}
            </form>
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