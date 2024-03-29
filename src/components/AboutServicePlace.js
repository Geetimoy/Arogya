import React, { useContext, useState, useEffect } from "react";


import AppTop from "./AppTop";
import Appfooter from "./AppFooter";

import "./AboutServicePlace.css"

import SystemContext from '../context/system/SystemContext';

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function AboutServicePlace(){
  const systemContext = useContext(SystemContext);

  const [data, setData] = useState({page_content:'', page_title:''});
  
  let jsonData = {};
      //jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TYPE;
      jsonData['device_token']          = DEVICE_TOKEN;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');

      jsonData["page_key"]              = "ABOUT_SERVICE_PLACE";
      jsonData["system_id"]             = "telehealth.serviceplace.org.in";
      jsonData["page_id"]               = 1;

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

  // const [post, setPost] = useState([]);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts?_limit=1")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPost(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  return(
    
    <>
      <AppTop></AppTop>
    
      <div className="app-body">
        <h5 className='title'>{data.page_title}</h5>
        {/* <h5>{systemContext.systemDetails.thp_domain_name}</h5> */}
        <p dangerouslySetInnerHTML={{ __html: data.page_content }}></p>

        {/* {post.map((post) => {
          return (
            <div>
              <h5 className='title'>{post.title}</h5>
              <p>{post.body}</p>
            </div>
          );
        })} */}
      </div>
      
      <Appfooter></Appfooter>
    </>
    
  );
}


export default AboutServicePlace;