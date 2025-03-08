import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

import './NgoList.css';


import globallogo from '../assets/images/global-icon.png';
import rgvnlogo from '../assets/images/rgvn-icon.png';
import b2hlogo from '../assets/images/b2h-icon.png';
import ukhralogo from '../assets/images/ukhra-icon.png';
import sevaapurulialogo from '../assets/images/sevaapurulia-icon.png';

function NgoList(){
  return(
    <div className='ngolist-container'>
      <div className="container">
        <div className="login-container">
          <div className="mt-3">
            <Link to="/">
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
            <span className="m-2">NGO List</span>
          </div>
          <div className="ngolist-box">
          <div className="row">
          <div className="col-6">
            <div className="button-box">
              <Link to="/login">
                <img src={globallogo} alt='' />
                <h6>For Anywhere</h6>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="button-box">
              <Link to="https://b2happ.serviceplace.org.in/" target="_blank">
                <img src={b2hlogo} alt='' />
                <h6>Near Kharagpur City</h6>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="button-box">
              <Link to="https://rgvnapp.serviceplace.org.in/" target="_blank">
                <img src={rgvnlogo} alt='' />
                <h6>Near Morigaon, Assam</h6>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="button-box">
              <Link to="https://ukhraapp.serviceplace.org.in/" target="_blank">
                <img src={ukhralogo} alt='' />
                <h6>Ukhra, Near Durgapur, West Bengal</h6>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="button-box">
              <Link to="https://sevaapurulia.serviceplace.org.in/" target="_blank">
                <img src={sevaapurulialogo} alt='' />
                <h6>Sevaa Purulia, West Bengal</h6>
              </Link>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NgoList;