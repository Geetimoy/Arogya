import { useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

function Category(props){

  console.log("key=" + props.name);

  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {

    const response = await fetch(`${API_URL}/childPeriodicDataCategory`);

    let result = await response.json();

    setCategoryList(result.results);

  }

  useEffect(()=>{

    fetchCategoryList();

  }, [])

  const onRemoveBtnClick = () =>{
    
  }

  return(
    <div className="category form-all">
          <div className='text-end mb-2'>
            {/* <FontAwesomeIcon icon={faTrash} onClick={onRemoveBtnClick}/> */}
          </div>
          <div className="form-group">
            <label><span className="d-block">Select Category </span></label>
            <select name={props.name} className="form-control" onChange={props.changefunc} default={0}>
              <option value="0">Select</option>
              {categoryList.map((category, index) => (
                <option value={category.history_data_cat_id} key={index}>{category.history_data_cat_name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-control pt-0"  name={props.name} onChange={props.changecatval} placeholder="" />
          </div>
          
        </div>
  )
}

export default Category;