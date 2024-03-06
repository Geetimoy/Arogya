import React, { useContext, useState, useEffect } from "react";

import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import SystemContext from '../context/system/SystemContext';

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function Help(){

  const systemContext = useContext(SystemContext);

  const [data, setData] = useState({page_content:'', page_title:''});

  let jsonData = {};
      //jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TYPE;
      jsonData['device_token']          = DEVICE_TOKEN;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');
      jsonData["page_key"] = "HELP";
      jsonData["page_id"] = 42;
      jsonData["system_id"] = "ukhra.serviceplace.org.in";

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
            // console.log(responseData.data.results[0]);
            
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
      <>
        <AppTop></AppTop>
          <div className="app-body">
              <h5 className="title">{data.page_title}</h5>
              <p dangerouslySetInnerHTML={{ __html: data.page_content }}></p>
          </div>
        <Appfooter></Appfooter>
      </>
  );
}


export default Help;