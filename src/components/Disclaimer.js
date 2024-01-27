import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

//import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";

import { Link } from "react-router-dom";
import SystemContext from "../context/system/SystemContext";
import { useContext, useState, useEffect } from 'react';

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function Disclaimer(){

  const systemContext = useContext(SystemContext);
  const [data, setData] = useState({page_content:'', page_title:''});

  let jsonData = {};
      jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TOKEN;
      jsonData['device_token']          = DEVICE_TYPE;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');
      jsonData["page_key"] = localStorage.getItem('page_key');
      //jsonData["system_id"] = "telehealth.serviceplace.org.in";

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${API_URL}/staticPage`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
            });
            
            const responseData = await response.json();
             console.log(responseData.data.results[0]);
            
            setData(responseData.data.results[0]);
            // console.log('Hi');
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchData();

        // eslint-disable-next-line
      }, []);

  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Disclaimer</span>
        </div>
        <div className='login-box disclaimer'>
          {/* <img src={logotelehealth} className="mb-3" alt="logo" /> */}
          <img src={systemContext.systemDetails.thp_app_logo_url} className="m-auto mb-3" alt={systemContext.systemDetails.thp_system_name} />
          <p><strong>Community-based TeleHealth Information Release</strong></p>
          <ul className='px-1'>
            <li className='d-flex mb-2'>
              <input tabindex="-1" id="disclaimer_check1" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check1" className="form-check-label mx-2">I have read and agree to all of the points listed below.</label>
            </li>
            <li className='d-flex mb-2'>
              <input tabindex="-2" id="disclaimer_check2" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check2" className="form-check-label mx-2">I agree to the information release to concerned persons for my patient information for the purpose of treatment, project reporting, future product research and planning.</label>
            </li>
            <li className='d-flex mb-2'>
              <input tabindex="-3" id="disclaimer_check3" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check3" className="form-check-label mx-2">I agree that information about my prescriptions, tests and diagnosis may be shared for pharmacies, test centers and medical personnel outside of TeleHealth program for the purpose of treatment, product research and future product planning.</label>
            </li>
            <li className='d-flex mb-2'>
              <input tabindex="-4" id="disclaimer_check4" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check4" className="form-check-label mx-2">In community based tele-medicine, we take patient privileged information seriously, and emphasize in our internal training. By the very nature of community based medicine,  neighbors and local agencies may be enlisted to help out with  service delivery, and I accept this usage model.</label>
            </li>
            <li className='d-flex mb-2'>
              <input tabindex="-5" id="disclaimer_check5" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check5" className="form-check-label mx-2">I agree to urgent medical transportation if needed, using whatever means available, even if an ambulance is not available for timely medical action.</label>
            </li>
          </ul>
          <div className='mb-3 mt-3 w-100'>
            <button type="submit" className='btn primary-bg-color text-light w-100'>Yes I agree</button>
          </div>
          <p className="text-center link-red mb-3">
              Already have an account ?
              <Link to="/login" className="primary-color mx-1">
                Login
              </Link>
            </p>
            <p className="text-center link-red mb-3">
              Don't have an account yet?
              <Link to="/signup" className="primary-color mx-1">
                Sign Up
              </Link>
            </p>
            <p className='text-center'>&copy; {(new Date().getFullYear())} {systemContext.systemDetails.thp_domain_name}. {(systemContext.systemDetails.thp_system_id > 0) && <span>Powered by <Link to={systemContext.systemDetails.thp_main_ngo_url} target="_blank" className="primary-color">{systemContext.systemDetails.thp_system_name}</Link></span>}</p>
            <div className="text-center login-logo">
            <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_ngo_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
            <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_sp_global_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;