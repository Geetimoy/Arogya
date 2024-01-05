import React, { useState, useEffect } from "react";

import AppTop from "./AppTop";
import Appfooter from "./AppFooter";

import "./AboutServicePlace.css"

function AboutServicePlace(){

  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return(
    
    <>
      <AppTop></AppTop>
      
      <div className="app-body">
        <h5 className='title'>About Service Place</h5>
        <p>Integer sagittis enim at nulla imperdiet porttitor. Cras ultrices, urna quis tincidunt porta, mauris nisl pretium nibh, vitae lacinia quam dui et augue. </p>

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