import Appfooter from './AppFooter';
import AppTop from './AppTop';

import Slider from "@mui/material/Slider";
import Cropper from "react-easy-crop";
//import getCroppedImg from '../cropper/Crop';

import './ProfilePhoto.css'

import profile from '../assets/images/profile.jpg';
import profileplaceholder from '../assets/images/profileplaceholder.jpg';
import { useCallback, useRef, useState } from 'react';
 
function ProfilePhoto(){

  // For File Upload and Crop
  const inputFileRef = useRef(null);
  const triggerInputFileCLick = (event) => {
    inputFileRef.current.click();
  }
  
  const handleImageUpload = async (e) => {
    //setImage(URL.createObjectURL(e.target.files[0]));
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
  const [image, setImage] = useState(profileplaceholder);
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
    
  }

  return (
    <>
      <AppTop></AppTop>
      <div className="app-body profile-photo">
        <h5 className="title">Update Profile Photo</h5>
        <p>
          You can change your existing photo here. Same photo will reflect
          thorughout the Arogya - Telemedicine Application.
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
                      <button type="button" className="btn btn-primary primary-bg-color border-0 mx-1">
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