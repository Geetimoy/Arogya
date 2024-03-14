import React, { useContext, useEffect } from "react";
import Appfooter from './AppFooter';
import getCroppedImg from "../cropper/Crop";

import Slider from "@mui/material/Slider";
import Cropper from "react-easy-crop";
import AlertContext from '../context/alert/AlertContext';
import SystemContext from "../context/system/SystemContext";

import './ProfilePhoto.css'
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { useCallback, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";
 
function ProfilePhoto(){

  const alertContext  = useContext(AlertContext);
  const systemContext = useContext(SystemContext);


  const [isMActive, setIsMActive]     = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  // For File Upload and Crop
  const inputFileRef = useRef(null);
  const triggerInputFileCLick = (event) => {
    inputFileRef.current.click();
  }

  const cancelPhotoUpload = () => {

  }
  
  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;
      setImage(base64Image);
    };
    reader.readAsDataURL(selectedFile);
  };
  const aspectRatio = 1;
  const [cropWidth, cropHeight] = [250, 250];
  const [image, setImage] = useState('/assets/images/profileplaceholder.jpg');
  const [crop, setCrop]   = useState({ x: 0, y: 0 });
  const [zoom, setZoom]   = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(image.indexOf("profileplaceholder.jpg") >= 0){
      alertContext.setAlertMessage({show:true, type: "error", message: "Please select a profile image!"});
    }
    else{
      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
      let currentCroppedImage = await getCroppedImg(image, croppedAreaPixels, rotation, cropWidth, cropHeight);
      let imageConfig = {
        'crop_area': croppedAreaPixels,
        'rotation': rotation,
        'zoom': zoom,
        'crop': crop
      }

      let jsonData = {};
      jsonData['system_id']        = systemContext.systemDetails.system_id;
      jsonData['device_type']      = DEVICE_TYPE;
      jsonData['device_token']     = DEVICE_TOKEN;
      jsonData['user_lat']         = localStorage.getItem('latitude');
      jsonData['user_long']        = localStorage.getItem('longitude');
      jsonData['account_key']      = decryptedLoginDetails.account_key;
      jsonData['account_type']     = decryptedLoginDetails.account_type;
      jsonData['user_login_id']    = decryptedLoginDetails.login_id;
      jsonData['image_info']       = JSON.stringify(imageConfig);
      jsonData['source_image']     = image;
      jsonData['cropped_image']    = currentCroppedImage;
      
      const response = await fetch(`${API_URL}/profilePhotoSave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      let result = await response.json();

      if (result.success) { 
        setImage(result.source_image);
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      } 
      else {
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
    }
  }

  const getUserDetails = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']         = systemContext.systemDetails.system_id;
    jsonData["account_key"]       = decryptedLoginDetails.account_key;
    jsonData["account_type"]      = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]     = decryptedLoginDetails.login_id;
    jsonData["device_type"]       = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]      = DEVICE_TOKEN;
    jsonData["user_lat"]          = localStorage.getItem('latitude');
    jsonData["user_long"]         = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getUserProfileDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    let userDetails = result1.data;

    setUserDetails(result1.data.results);

    if(userDetails.source_image !== ""){
      var imageConfig = JSON.parse(userDetails.profile_photo);
      setImage(userDetails.source_image+'?timestamp='+Math.random());
      setCrop(imageConfig.crop);
      setZoom(imageConfig.zoom);
      setRotation(imageConfig.rotation);
      setCroppedAreaPixels(imageConfig.crop_area);
      setCroppedImage(userDetails.shared_image+'?timestamp='+Math.random());
    }

  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getUserDetails();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id])

  return (
    <>
      <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>Update Profile Photo </h5>
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
      <div className="app-body profile-photo">
        <p>
          You can change your existing photo here. Same photo will reflect
          thorughout the Application.
        </p>
        <form className="edit-user-profile-photo-form" name="edit_user_profile_photo_form"
          id="edit_user_profile_photo_form">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <div className="row">
                  <div className="col-12">
                    {/* <div className="current-image">
                      <img src={profile} alt="" />
                    </div> */}
                    <div className="current-image">
                      <div className="container" style={{ width: "300px", height: "300px" }}>
                        <div className="crop-container">
                          <Cropper
                            image={image}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            zoomSpeed={4}
                            maxZoom={3}
                            zoomWithScroll={true}
                            showGrid={true}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                          />
                        </div>
                      </div>
                      <div className="controls">
                        <label>
                          Rotate
                          <Slider
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="rotate"
                            onChange={(e, rotation) => setRotation(rotation)}
                            className="range"
                          />
                        </label>
                        <label>
                          Zoom
                          <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="zoom"
                            onChange={(e, zoom) => setZoom(zoom)}
                            className="range"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="btns-group d-flex justify-content-center">
                      <button type="button" id="edit_user_photo_form_submit" name="edit_user_photo_form_submit"
                        className="btn btn-primary primary-bg-color border-0 mx-1" onClick={triggerInputFileCLick}>
                        Upload
                        <input
                            type="file"
                            ref={inputFileRef}
                            name="cover"
                            onChange={handleImageUpload}
                            accept="img/*"
                            style={{ display: "none" }}
                          />
                      </button>
                      <button type="button" className="btn btn-primary primary-bg-color border-0 mx-1" onClick={handleFormSubmit}>
                        Save
                      </button>
                      <button type="button" className="btn btn-primary primary-bg-color border-0 mx-1" onClick={cancelPhotoUpload}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );

 }

 export default ProfilePhoto;