import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import { Link, useParams } from "react-router-dom";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import Select from 'react-select';
import AppTopNotifications from '../AppTopNotifications';

function ChildViewMedicalHistory(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const editAccountKey = urlParam.accountKey;

  const [isMActive, setIsMActive] = useState(false);

  const [selectedEyeOptions, setSelectedEyeOptions] = useState([]);
  const [eyeOption, setEyeOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Dimness of Vision', value: '1' },
    { label: 'Eye Pain', value: '2' },
    { label: 'Eye Redness', value: '3' },
    { label: 'Watery Eyes', value: '4' }
  ]);

  const [selectedEarOptions, setSelectedEarOptions] = useState([]);
  const [earOption, setEarOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Hearing Loss', value: '1' },
    { label: 'Water or pus from the ear', value: '2' }
  ]);

  const [selectedNoseOptions, setSelectedNoseOptions] = useState([]);
  const [noseOption, setNoseOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Stuffy Nose', value: '1' },
    { label: 'Runny or watery nose', value: '2' },
    { label: 'Bleeding from the nose', value: '3' }
  ]);


  const [selectedMouthOptions, setSelectedMouthOptions] = useState([]);
  const [mouthOption, setMouthOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Difficulty in Swallowing', value: '1' },
    { label: 'Carries Tooth (cavity etc.)', value: '2' },
    { label: 'Sores on gums', value: '3' }
  ]);

  const [selectedDigestiveOptions, setSelectedDigestiveOptions] = useState([]);
  const [digestiveOption, setDigestiveOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Loss of Appetite', value: '1' },
    { label: 'Nausia/vomiting', value: '2' },
    { label: 'Diarrhea', value: '3' },
    { label: 'Constipation', value: '4' },
    { label: 'Abdominal (stomach) pain', value: '5' },
    { label: 'Blood with stool.', value: '6' }
  ]);


  const [selectedGeneralOptions, setSelectedGeneralOptions] = useState([]);
  const [generalOption, setGeneralOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Cough - dry/productive ?', value: '1' },
    { label: 'Shortness of breath', value: '2' },
    { label: 'Sound while breathing (Wheezing)', value: '3' }
  ]);

  const [selectedUrinaryOptions, setSelectedUrinaryOptions] = useState([]);
  const [urinaryOption, setUrinaryOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Frequent Urination', value: '1' },
    { label: 'Burning during urination', value: '2' },
    { label: 'Itching', value: '3' },
    { label: 'White discharge', value: '4' }
  ]);

  const [selectedPeriodsOptions, setSelectedPeriodsOptions] = useState([]); 
  const [periodsOption, setPeriodsOption] = useState([
    { label: 'None', value: '0' },  
    { label: 'Irregular Periods', value: '1' },
    { label: 'Itching', value: '2' },
    { label: 'Color of discharge(dark, red, pink...)', value: '3' },
    { label: 'Age of Menarchy(menstruation)', value: '4' }
  ]);

  const [formData, setFormData] = useState({
    eye_type: {required: true, value:"", errorClass:"", errorMessage:""},
    ears_type: {required: true, value:"", errorClass:"", errorMessage:""},
    nose_type: {required: true, value:"", errorClass:"", errorMessage:""},
    mouth_type: {required: true, value:"", errorClass:"", errorMessage:""},
    digestive_type: {required: true, value:"", errorClass:"", errorMessage:""},
    general_type: {required: true, value:"", errorClass:"", errorMessage:""},
    urinary_problems_type: {required: true, value:"", errorClass:"", errorMessage:""},
    periods_type: {required: true, value:"", errorClass:"", errorMessage:""},
    remarks: {required: false, value:"", errorClass:"", errorMessage:""}
  });

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const getMedicalHistory = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']           = systemContext.systemDetails.system_id;
    jsonData["child_account_key"]   = editAccountKey;
    jsonData["child_account_type"]  = 3;
    jsonData["doctor_account_key"]  = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"] = decryptedLoginDetails.account_type;
    jsonData["device_type"]         = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]        = DEVICE_TOKEN;
    jsonData["user_lat"]            = localStorage.getItem('latitude');
    jsonData["user_long"]           = localStorage.getItem('longitude');
    jsonData["search_param"]        = {
                                        "by_keywords": "",
                                        "limit": "20",
                                        "offset": "0",
                                        "order_by_field": "account_id",
                                        "order_by_value": "desc"
                                      }
    
    const response1 = await fetch(`${API_URL}/childMedicalHistoryListFromDoctorLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    if(result1.data.length > 0){
      let medicalHistory = result1.data[0];
      console.log(medicalHistory);

      var eyeTypeArray = [];
      if(medicalHistory.eye_type && medicalHistory.eye_type !== ''){
        eyeTypeArray = medicalHistory.eye_type.replace(/^\{|\}$/g,'').split(',');
        var array1 = new Array();
        eyeTypeArray.forEach((item)=>{
          eyeOption.forEach((opt)=>{
            if(opt.value === item){
              array1.push(opt);
            }
          })
        })
        setSelectedEyeOptions(array1);
      }

      var earTypeArray = [];
      if(medicalHistory.ears_type && medicalHistory.ears_type !== ''){
        earTypeArray = medicalHistory.ears_type.replace(/^\{|\}$/g,'').split(',');  
        var array2 = new Array();
        earTypeArray.forEach((item)=>{
          earOption.forEach((opt)=>{
            if(opt.value === item){
              array2.push(opt); 
            }
          })
        })
        setSelectedEarOptions(array2);
      }

      var noseTypeArray = [];
      if(medicalHistory.nose_type && medicalHistory.nose_type !== ''){
        noseTypeArray = medicalHistory.nose_type.replace(/^\{|\}$/g,'').split(',');
        var array3 = new Array();
        noseTypeArray.forEach((item)=>{
          noseOption.forEach((opt)=>{
            if(opt.value === item){
              array3.push(opt);
            }
          })
        })
        setSelectedNoseOptions(array3);
      }

      var mouthTypeArray = [];
      if(medicalHistory.mouth_type && medicalHistory.mouth_type !== ''){
        mouthTypeArray = medicalHistory.mouth_type.replace(/^\{|\}$/g,'').split(',');
        var array4 = new Array();
        mouthTypeArray.forEach((item)=>{
          mouthOption.forEach((opt)=>{
            if(opt.value === item){
              array4.push(opt);
            }
          })
        })
        setSelectedMouthOptions(array4);
      }

      var digestiveTypeArray = [];
      if(medicalHistory.digestive_system_type && medicalHistory.digestive_system_type !== ''){
        digestiveTypeArray = medicalHistory.digestive_system_type.replace(/^\{|\}$/g,'').split(',');
        var array5 = new Array();
        digestiveTypeArray.forEach((item)=>{
          digestiveOption.forEach((opt)=>{
            if(opt.value === item){
              array5.push(opt);
            }
          })
        })
        setSelectedDigestiveOptions(array5);
      } 

      var generalTypeArray = [];
      if(medicalHistory.general_type && medicalHistory.general_type !== ''){
        generalTypeArray = medicalHistory.general_type.replace(/^\{|\}$/g,'').split(',');
        var array6 = new Array();
        generalTypeArray.forEach((item)=>{
          generalOption.forEach((opt)=>{
            if(opt.value === item){
              array6.push(opt);
            }
          })
        })
        setSelectedGeneralOptions(array6);
      }

      var urinaryTypeArray = [];
      if(medicalHistory.urinary_problems_type && medicalHistory.urinary_problems_type !== ''){
        urinaryTypeArray = medicalHistory.urinary_problems_type.replace(/^\{|\}$/g,'').split(',');
        var array7 = new Array();
        urinaryTypeArray.forEach((item)=>{
          urinaryOption.forEach((opt)=>{
            if(opt.value === item){
              array7.push(opt);
            }
          })
        })
        setSelectedUrinaryOptions(array7);
      }

      var periodsTypeArray = [];
      if(medicalHistory.periods_type && medicalHistory.periods_type !== ''){
        periodsTypeArray = medicalHistory.periods_type.replace(/^\{|\}$/g,'').split(',');
        var array8 = new Array();
        periodsTypeArray.forEach((item)=>{
          periodsOption.forEach((opt)=>{
            if(opt.value === item){
              array8.push(opt);
            }
          })
        })
        setSelectedPeriodsOptions(array8);
      }



      formData['eye_type']      = {value:eyeTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['ears_type']     = {value:earTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['nose_type']     = {value:noseTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['mouth_type']    = {value:mouthTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['digestive_type'] = {value:digestiveTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['general_type']  = {value:generalTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['urinary_problems_type']  = {value:urinaryTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['periods_type']  = {value:periodsTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['remarks']       = {value:medicalHistory.remarks, required: false, errorClass:"", errorMessage:""};

      setFormData({...formData, ...formData});

    }

  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getMedicalHistory();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id]);


  const [eyeTypeClass, setEyeTypeClass] = useState('');
  const [earTypeClass, setEarTypeClass] = useState('');
  const [noseTypeClass, setNoseTypeClass] = useState('');
  const [mouthTypeClass, setMouthTypeClass] = useState('');
  const [digestiveTypeClass, setDigestiveTypeClass] = useState('');
  const [generalTypeClass, setGeneralTypeClass] = useState('');
  const [urinaryTypeClass, setUrinaryTypeClass] = useState('');
  const [periodsTypeClass, setPeriodsTypeClass] = useState('');

  useEffect(() => {
  }, [earTypeClass, eyeTypeClass, noseTypeClass, mouthTypeClass, digestiveTypeClass, generalTypeClass, urinaryTypeClass, periodsTypeClass]);

  const setActiveClass = (element) => {

    setEyeTypeClass('');
    setEarTypeClass('');
    setNoseTypeClass('');
    setMouthTypeClass('');
    setDigestiveTypeClass('');
    setGeneralTypeClass('');
    setPeriodsTypeClass('');

    if(element === 'eye_type'){
      setEyeTypeClass('selected');
    }
    else if(element === 'ears_type'){ 
      setEarTypeClass('selected');
    }
    else if(element === 'nose_type'){ 
      setNoseTypeClass('selected');
    }
    else if(element === 'mouth_type'){ 
      setMouthTypeClass('selected');
    }
    else if(element === 'digestive_type'){ 
      setDigestiveTypeClass('selected');
    }
    else if(element === 'general_type'){ 
      setGeneralTypeClass('selected');
    }
    else if(element === 'urinary_problems_type'){ 
      setUrinaryTypeClass('selected');
    }
    else if(element === 'periods_type'){ 
      setPeriodsTypeClass('selected');
    }
  }

  const getUserBasicDetails = async () => {

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 31;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getProfileDetailsFromDoctorLogin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });
    let result = await response1.json();

    if(result.success){
      setUserBasicDetails(result.data);
    }
    else{
      setUserBasicDetails([]); 
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id && editAccountKey){
      getUserBasicDetails();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id, editAccountKey]);

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
            <h5 className='mx-2 mb-0'>View Child Medical History </h5>
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
      <div className='app-body create-patient-profiles form-all create-young-woman'>
        <p><small>View Child Medical History</small></p>
        <p className='patient-details'>
          {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        <p><strong>Do you have these problems?</strong></p>
        <form className="mt-3 select-box" name="medicalHistoryForm" id="medicalHistoryForm">
          <div className={`form-group ${eyeTypeClass}`}>
            <label><span className="d-block">Eye <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedEyeOptions} options={eyeOption} onFocus={() =>  setActiveClass('eye_type')} isDisabled={true}/>
          </div>
          <div className={`form-group ${earTypeClass}`}>
            <label><span className="d-block">Ears <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedEarOptions} options={earOption} onFocus={() =>  setActiveClass('ears_type')} isDisabled={true}/>
          </div>
          <div className={`form-group ${noseTypeClass}`}>
            <label><span className="d-block">Nose <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedNoseOptions} options={noseOption} onFocus={() =>  setActiveClass('nose_type')} isDisabled={true}/>
          </div>
          <div className={`form-group ${mouthTypeClass}`}>
            <label><span className="d-block">Mouth <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedMouthOptions} options={mouthOption} onFocus={() =>  setActiveClass('mouth_type')} isDisabled={true}/>
          </div>
          <div className={`form-group ${digestiveTypeClass}`}>
            <label><span className="d-block">Digestive system <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedDigestiveOptions} options={digestiveOption} onFocus={() =>  setActiveClass('digestive_type')} isDisabled={true}/>
          </div>
          <div className={`form-group ${generalTypeClass}`}>
            <label><span className="d-block">General <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedGeneralOptions} options={generalOption} onFocus={() =>  setActiveClass('general_type')} isDisabled={true}/>
          </div>
          <div className={`form-group ${urinaryTypeClass}`}>
            <label><span className="d-block">Urinary <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedUrinaryOptions} options={generalOption} onFocus={() =>  setActiveClass('urinary_problems_type')} isDisabled={true}/>
          </div>
          <div className={`form-group ${periodsTypeClass}`}>
            <label><span className="d-block">Period <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedPeriodsOptions} options={periodsOption} onFocus={() =>  setActiveClass('periods_type')} isDisabled={true}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="describe">Describe / Explain Problems: </label>
            <textarea rows="3" name="remarks" id="remarks" className="form-control" placeholder="Describe / Explain Problems" value={formData["remarks"].value}></textarea>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default ChildViewMedicalHistory;