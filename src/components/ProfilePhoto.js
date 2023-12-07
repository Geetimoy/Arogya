import React, { useEffect, useRef, useState } from 'react';

import Appfooter from './AppFooter';
import AppTop from './AppTop';

import './ProfilePhoto.css'
 
function ProfilePhoto(){

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error(`Error getting location: ${error.message}`);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
      }
    };

    getLocation();
    // eslint-disable-next-line
  }, [])

  const videoRef = useRef();
  const canvasRef = useRef();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match the video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas content to data URL (base64)
    const imageDataURL = canvas.toDataURL('image/png');
    console.log('Captured Image:', imageDataURL);
  };

  return(
    <>
      <AppTop></AppTop>
        <div className='app-body'>
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
          <h5 className='title'>Update Profile Photo</h5>
          <p>You can change your existing photo here. Same photo will reflect thorughout the Arogya - Telemedicine Application.</p>
          <form className="edit-user-profile-photo-form" name="edit_user_profile_photo_form" id="edit_user_profile_photo_form">
            <div className='row'>
              <div className='col-12'>
                <div className='mt-3 my-3'><strong>Crop Image goes here...</strong></div>
                <p>This profile picture will be used for all futher references.
                  Upload your personal image by clicking upload button and customize it by dragging the left photo.
                </p> 
                <label htmlFor="file-upload" className='custom-file-upload'>
                  Upload / Replace
                </label>
                <label className='custom-file-upload' style={{marginLeft:"10px"}} onClick={startCamera}>
                  Use Camera
                </label>
                
                <input id="file-upload" type="file"></input>
                
                <div className='btns-group d-flex justify-content-center'>
                  <button type="button" id="edit_user_photo_form_submit" name="edit_user_photo_form_submit" className="btn btn-primary bg-danger border-0 mx-2" onClick={captureImage}>Update Photo</button>
                  <button type="button" className="btn btn-primary bg-danger border-0 mx-2">Cancel</button>
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