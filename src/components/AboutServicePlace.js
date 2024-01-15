import React, { useState, useEffect } from "react";

import AppTop from "./AppTop";
import Appfooter from "./AppFooter";

import "./AboutServicePlace.css"

//import SystemContext from '../context/system/SystemContext';

import { API_URL } from "./util/Constants";

function AboutServicePlace(){
  //const systemContext = useContext(SystemContext);

  const [data, setData] = useState({page_content:'', page_title:''});
  
  let jsonData = {};

      jsonData["page_key"] = localStorage.getItem('page_key');
      jsonData["system_id"] = "telehealth.serviceplace.org.in";

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
        <p>{data.page_content} </p>

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