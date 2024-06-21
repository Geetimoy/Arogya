import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Category(props){
  console.log("key=" + props.name);

  const onRemoveBtnClick = () =>{
    
  }

  return(
    <div className="category">
          <div className='text-end mb-2'>
            {/* <FontAwesomeIcon icon={faTrash} onClick={onRemoveBtnClick}/> */}
          </div>
          <div className="form-group">
            <label><span className="d-block">Select Category </span></label>
            <select name={props.name} className="form-control" onChange={props.changefunc}>
              <option value="1">Body weight in kgs</option>
              <option value="2">Body height in cm</option>
              <option value="3">Temperature</option>
              <option value="4">Oxygen Level</option>
              <option value="5">Heart Rate</option>
              <option value="6">Do you have Blood Pressure?</option>
              <option value="7">Are you Diabetic?</option>
              <option value="8">Do you have Cholesterol problem?</option>
              <option value="9">Do you have Thyroid?</option>
              <option value="10">Iron/Folic Acid Tablets</option>
              <option value="11">Calcium Tablets</option>
              <option value="12">Sanitary Pads</option>
              <option value="13">Protein Supplement</option>
              <option value="14">Repeat De-Warming</option>
              <option value="15">Repeat Hemoglobin Test</option>
              <option value="16">Repeat Medicine</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-control pt-0"  name="" id="" placeholder="" />
          </div>
          
        </div>
  )
}

export default Category;