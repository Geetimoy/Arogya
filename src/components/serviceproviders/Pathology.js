import { useState, useContext, useEffect, useRef } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN, PAGINATION_LIMIT } from "../util/Constants";

import './ServiceProviders.css'
import AppTopNotifications from '../AppTopNotifications';
import SystemContext from "../../context/system/SystemContext";

function Pathology() {

  const searchRef = useRef(null);

  const systemContext = useContext(SystemContext);
  
  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [providerId, setProviderId] = useState('2');
  const [providerList, setProviderList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const searchPathology = (e) => {
    setProviderList([]); // Reset child list when searching
    setLoadMore(false); // Reset load more state
    setTotalCount(0); // Reset total count
    setTimeout(()=>{
      listPathology(searchRef.current.value, 0); // Call listChild with search key
    }, 500)
  }

  const listPathology = async (searchKey, customOffset) => {
    
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["provider_id"]               = providerId; // 1 - Clinic Nursing Home
    jsonData["search_param"]              = {
                                              "by_keywords": searchKey,
                                              "limit": PAGINATION_LIMIT,
                                              "offset": customOffset,
                                              "order_by_field": "id",
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/getServiceProviderDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    
    if(result.success){
      if(result.data.length > 0){
        setProviderList((prevList) => [...prevList, ...result.data]); // Append new data to existing list
        setOffset(customOffset + PAGINATION_LIMIT); // Update offset for next load
        setTotalCount(result.total_count); // Update total count
        if(providerList.length + result.data.length >= result.total_count){
          setLoadMore(false); // Disable load more if all data is loaded
        }
        else{
          setLoadMore(true); // Enable load more if more data is available
        }
      }
      else{
        setProviderList([]); // Reset list if no data found
        setLoadMore(false);
        setTotalCount(0);
      }
    }
    else{
      setProviderList([]); 
      setLoadMore(false);
      setTotalCount(0);
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listPathology("", 0);
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const loadMorePathology = () => {
    listPathology(searchRef.current.value, offset); // Load more data
  }

  return (
    <>
    <div className='app-top inner-app-top services-app-top'>
      <div className='app-top-box d-flex align-items-center justify-content-between'>
        <div className='app-top-left d-flex align-items-center'>
          <div className='scroll-back'>
            <Link to="/service-providers" className=''>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
          </div>
          <h5 className='mx-2 mb-0'>Pathology</h5>
        </div>
        <div className='app-top-right d-flex'> 
          <AppTopNotifications /> 
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
    <div className="app-body service-provider">
      <div className='search-patient mt-3 mb-3'>
        <div className='input-group'>
          <input type="text" className='form-control' placeholder='Search Pathology' id="searchPathology" name="searchPathology" />
          <span className="input-group-text" onClick={searchPathology}><FontAwesomeIcon icon={faSearch} /></span>
        </div>
      </div>
      <div className='row'>
        {providerList && providerList.map((provider, index) => (
          <div className='col-12 mb-3' key={provider.id}>
            <div className='button-box-providers mb-3'>
              <ul className='p-0 m-0'>
                <li><span className='fw-bold min-width'>Name :</span> {provider.name}</li>
                <li><span className='fw-bold'>Location :</span> {provider.location}</li>
                <li><span className='fw-bold'>Contact :</span> {provider.contact_number}</li>
                <li><span className='fw-bold'>Services :</span> {provider.services}</li>
              </ul>
            </div>
          </div>
        ))}

        {providerList.length === 0 && <div className='col-12 text-center'>No Records Found</div>}

        {loadMore && <div className='col-12 text-center'>
          <Link to="#" className='btn btn-primary primary-bg-color border-0' onClick={loadMorePathology}>Load More</Link> 
        </div>}
      </div>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}
export default Pathology;