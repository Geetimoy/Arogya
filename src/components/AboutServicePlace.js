import AppTop from "./AppTop";
import Appfooter from "./AppFooter";

import "./AboutServicePlace.css"

function AboutServicePlace(){
  return(
    
    <>
      <AppTop></AppTop>
      <div className="app-body">
        <h5 className='title mb-0'>About Service Place</h5>
      </div>
      <Appfooter></Appfooter>
    </>
    
  );
}


export default AboutServicePlace;