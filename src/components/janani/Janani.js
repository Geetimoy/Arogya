import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import youngwomenprofile from '../../assets/images/profile-girl.png';

import SystemContext from "../../context/system/SystemContext";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

function Janani(){

  const systemContext = useContext(SystemContext);

  const [isActive, setIsActive] = useState(false);

  const [jananiList, setJananiList]   = useState([]);
  const [openMenuId, setOpenMenuId]   = useState(0);

  const handleMenuClick = (accountId) => {
    setOpenMenuId(openMenuId === accountId ? 0 : accountId);
  };

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const searchJanani = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listJanani(value);
    }, 1000)
  }

  const listJanani = async (searchKey) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": searchKey,
                                              "limit": "10",
                                              "offset": "0",
                                              "order_by_field": "account_id",
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/jananiProfileList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      setJananiList(result.data);
    }
    else{
      setJananiList([]); 
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listJanani("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/services" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Janani</h5>
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
      <div className="app-body janani profile-listing">
        <div className='add-patient'><Link to="/janani/create-janani" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Janani</Link></div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Janani' />
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>

          {jananiList.map((janani, index) => (
            <div className='col-6' key={janani.account_id}>
              <div className='button-box'>
                <div className={`three-dot my-element2 ${openMenuId === janani.account_id ? 'active' : ''}`} onClick={() => handleMenuClick(janani.account_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>

                {openMenuId === janani.account_id && <div className='drop-menu'>
                    <ul>
                      <li><Link to={`/janani/janani-basic-information/${janani.account_key}`}>Edit Basic Information</Link></li>
                      <li><Link to={`/janani/janani-update-medical-history/${janani.account_key}`}>Update Medical History</Link></li>
                      <li><Link to={`/janani/janani-periodic-data`}>Update Periodic Data</Link></li>
                      <li><Link to={`/janani/janani-awareness-survey/${janani.account_key}`}>Update Awareness Survey</Link></li>
                      <li><Link to={`/janani/janani-prescriptions/${janani.account_key}`}>Upload Prescriptions</Link></li>
                      <li><Link to={`#`}>Close Profile </Link></li>
                    </ul>
                  </div>
                }
                <Link to="#">
                  <img src={youngwomenprofile} alt='' />
                  <h6>{janani.janani_name}</h6>
                </Link>
              </div>
            </div>
          ))}

          {jananiList.length === 0 && <div className='col-12 text-center'>No Records Found</div>}
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default Janani;