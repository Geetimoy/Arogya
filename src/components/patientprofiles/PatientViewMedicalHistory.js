import { useState, useContext } from 'react';
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";


function PatientViewMedicalHistory(){
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
            <Link to="/patientprofiles" className=''>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
          </div>
          <h5 className='mx-2 mb-0'> View Patient Medical History </h5>
          
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
    <div className='app-body form-all create-patient-profiles create-young-woman'>
      <p><small> Patient Medical History</small></p>
      <p><strong>Do you have these problems?</strong></p>
      <form className="mt-3" name="medicalHistoryForm" id="medicalHistoryForm">
        <div className="form-group">
          <label><span className="d-block">Any drug allergy  <span className="text-danger">*</span></span></label>
          <input type="text" className="form-control" name="drug_allergy" id="drug_allergy" placeholder="Any drug allergy"/>
        </div>

        <div className='form-group'>
            <label><span className="d-block">Any previous illness  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_illness" id="previous_illness"  value='' placeholder="Any previous illness"/>
            
          </div>
          <div className='form-group'>
            <label><span className="d-block">Any operation  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_operations_if_any" id="previous_operations_if_any"  value='' placeholder="Any operation"/>
            
          </div>
          <div className='form-group'>
            <label><span className="d-block">Any previous or recent Medications  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_recent_medication" id="previous_recent_medication"  value='' placeholder="Any previous or recent Medications"/>
            
          </div>
          <div className='form-group'>
            <label><span className="d-block">Any other medical record  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_other_medical_record" id="previous_other_medical_record" value='' placeholder="Any other medical record"/>
            
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Excercise?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="excercise_y" name="do_excercise" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="excercise_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="excercise_n" name="do_excercise" className="custom-control-input" value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="excercise_n">No</label>
              </div>
            </div>
            
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Smoke?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoke_y" name="do_smoke" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="smoke_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoke_n" name="do_smoke" className="custom-control-input" value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="smoke_n">No</label>
              </div>
            </div>
            
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Drink Alcohol?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_alcohol_y" name="drink_alcohol" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="drink_alcohol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_alcohol_n" name="drink_alcohol" className="custom-control-input" value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="drink_alcohol_n">No</label>
              </div>
            </div>
            
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Drink Caffeine?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_caffeine_y" name="drink_caffeine" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="drink_caffeine_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_caffeine_n" name="drink_caffeine" className="custom-control-input"  value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="drink_caffeine_n">No</label>
              </div>
            </div>
            
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Diet?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diet_y" name="do_diet" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="diet_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diet_n" name="do_diet" className="custom-control-input" value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="diet_n">No</label>
              </div>
            </div>
            
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Current Medication?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="current_medication_y" name="curent_medication" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="current_medication_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="current_medication_n" name="curent_medication" className="custom-control-input" value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="current_medication_n">No</label>
              </div>
            </div>
            
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Diabetic?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_y" name="diabetic" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="diabetic_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_n" name="diabetic" className="custom-control-input" value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="diabetic_n">No</label>
              </div>
            </div>
            
          </div>

          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Pressure?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_h" name="high_low_pressure" className="custom-control-input" value="High" checked='' />
                <label className="custom-control-label no-style" htmlFor="pressure_h">High</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_l" name="high_low_pressure" className="custom-control-input" value="Low" checked='' />
                <label className="custom-control-label no-style" htmlFor="pressure_l">Low</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_n" name="high_low_pressure" className="custom-control-input" value="Normal" checked='' />
                <label className="custom-control-label no-style" htmlFor="pressure_n">Normal</label>
              </div>
            </div>
            
          </div>

          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Cholesterol?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="cholesterol_y" name="cholesterol" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="cholesterol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="cholesterol_n" name="cholesterol" className="custom-control-input" value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="cholesterol_n">No</label>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Thyroid?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="thyroid_y" name="thyroid" className="custom-control-input" value="Yes" checked='' />
                <label className="custom-control-label no-style" htmlFor="thyroid_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="thyroid_n" name="thyroid" className="custom-control-input" value="No" checked='' />
                <label className="custom-control-label no-style" htmlFor="thyroid_n">No</label>
              </div>
            </div>
            
          </div>

          <div className='form-group'>
            <label><span className="d-block">Blood Pressure  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_pressure_readings" id="patient_pressure_readings" placeholder="Blood Pressure"/>
            
          </div>
          <div className='form-group'>
            <label><span className="d-block">Blood Cholesterol  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_cholesterol_readings" id="patient_cholesterol_readings" placeholder="Blood Cholesterol"/>
            
          </div>
          <div className='form-group'>
            <label><span className="d-block">Blood Sugar  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_sugar_readings" id="patient_sugar_readings" placeholder="Blood Sugar"/>
            
          </div>
          <div className='form-group'>
            <label><span className="d-block">Blood Thyroid  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_thyroid_readings" id="patient_thyroid_readings" placeholder="Blood Thyroid"/>
            
          </div>
          <div className='form-group'>
            <label><span className="d-block">Body Temperature  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_temperature_faren" id="patient_temperature_faren" placeholder="Body Temperature"/>
           
          </div>
          <div className='form-group'>
            <label><span className="d-block">Blood Oxygen  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_blood_oxygen" id="patient_blood_oxygen" placeholder="Blood Oxygen"/>
            
          </div>
          <div className='form-group'>
            <label><span className="d-block">Heart Rate(per minute)  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_heart_rate_per_minute" id="patient_heart_rate_per_minute" placeholder="Heart Rate(per minute)"/>
            
          </div>
          <div className="form-group">
            <label><span className="d-block">Describe / Explain Problems:  </span></label>
            <textarea rows="3" name="remarks" id="remarks" className="form-control" placeholder="Describe / Explain Problems"></textarea>
            
          </div>
      </form>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}


export default PatientViewMedicalHistory;