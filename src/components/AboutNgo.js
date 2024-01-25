import React, { useContext, useState, useEffect } from "react";

import AppTop from "./AppTop";
import Appfooter from "./AppFooter";

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function AboutNgo(){

  const [data, setData] = useState({page_content:'', page_title:''});

  let jsonData = {};
      // jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TOKEN;
      jsonData['device_token']          = DEVICE_TYPE;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');

      //jsonData["page_key"] = localStorage.getItem('page_key');
      jsonData["page_key"] = "ABOUT_UKHRA_SEVAA";
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
        {/* <p> Vivamus nec pharetra arcu. Nulla dapibus magna a arcu lacinia porta. Pellentesque egestas eros et est suscipit iaculis. Nunc finibus non quam et gravida. Vestibulum rhoncus pharetra iaculis. Nulla nec efficitur orci, a volutpat est.</p> */}
        <p dangerouslySetInnerHTML={{ __html: data.page_content }}></p>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default AboutNgo;