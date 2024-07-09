import React, { useContext, useState, useEffect } from "react";

import AppTop from "./AppTop";
import Appfooter from "./AppFooter";

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function AboutNgo(){

  const [data, setData] = useState({page_content:'', page_title:''});

  let jsonData = {};
      // jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TYPE;
      jsonData['device_token']          = DEVICE_TOKEN;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');

      //jsonData["page_key"] = localStorage.getItem('page_key');
      jsonData["page_key"]              = "ABOUT_AROGYA_TELEHEALTH";
      jsonData["system_id"]             = "telehealth.serviceplace.org.in";
      jsonData["page_id"]               = 2;

      useEffect(() => {
        fetchData();
        // eslint-disable-next-line
      }, []);

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
          //console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          // setLoading(false);
        }
      }

  return(
    <>
      <AppTop></AppTop>
        <div className="app-body">
        <h5 className="title">{data.page_title}</h5>
        {/* <p> Vivamus nec pharetra arcu. Nulla dapibus magna a arcu lacinia porta. Pellentesque egestas eros et est suscipit iaculis. Nunc finibus non quam et gravida. Vestibulum rhoncus pharetra iaculis. Nulla nec efficitur orci, a volutpat est.</p> */}
        <p dangerouslySetInnerHTML={{ __html: data.page_content }}></p>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default AboutNgo;