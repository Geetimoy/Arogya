import Appfooter from "./AppFooter";
import ServicesAppTop from "./ServicesAppTop";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import "./Bookings.css"

function Bookings(){
  return(
    <>
      <ServicesAppTop></ServicesAppTop>
      <div className="app-body bookings">
        <h5 className="title">Bookings </h5>
        <div className="add-booking"><a class="btn btn-sm btn-primary" href="#">Add New Booking</a></div>
        <div className="row">
          <div className="col-12">
            <div className="button-box mb-3">
              <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span>
              <p><span className="d-block">Appointment ID:</span> APP24462D573</p>
              <p><span className="d-block">Doctor Name:</span> Doctor2</p>
              <p><span className="d-block">Specialization:</span> Test</p>
              <p><span className="d-block">Appointment Date:</span> Friday 16th February, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:38 PM</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <p><span className="d-block">Booking Status:</span> Doctor Confirmation Pending</p>
            </div>
            <div className="button-box mb-3">
              <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span>
              <p><span className="d-block">Appointment ID:</span> APP24462D573</p>
              <p><span className="d-block">Doctor Name:</span> Doctor2</p>
              <p><span className="d-block">Specialization:</span> Test</p>
              <p><span className="d-block">Appointment Date:</span> Friday 16th February, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:38 PM</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <p><span className="d-block">Booking Status:</span> Doctor Confirmation Pending</p>
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default Bookings;