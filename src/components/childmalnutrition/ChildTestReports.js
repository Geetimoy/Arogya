import { useState, useContext } from 'react';
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import docIcon from '../../assets/images/doc-icon.jpg';


function ChildTestReports(){
  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/child-malnutrition" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Test Reports </h5>
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
      <div className="app-body young-womens upload-prescription">
        <div className='add-patient align-items-center d-flex justify-content-between'>
          <span>Total - 1</span>
          <Link className='btn btn-sm btn-primary primary-bg-color border-0' to={`/childmalnutrition/child-upload-prescription/`}>Upload</Link>
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Test Reports'/>
            <span class="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>
            <div className='col-6'>
              <div className='button-box'>
                <div className='prescription'>
                  <div className="btn-download"><Link target="_blank"><FontAwesomeIcon icon={faDownload}/></Link></div>
                  <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div>
                  <img src={docIcon} alt='' className='w-100' />
                  <p className='mb-1'><strong>Test Report</strong></p>
                </div>
              </div>
            </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default ChildTestReports;