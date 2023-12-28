import AppTop from "./AppTop";
import Appfooter from "./AppFooter";

import "./AboutServicePlace.css"

function AboutServicePlace(){
  return(
    
    <>
      <AppTop></AppTop>
      <div className="app-body">
        <h5 className='title'>About Service Place</h5>
        <p>Nam non augue sed augue convallis rhoncus. Quisque auctor justo ac rutrum tempor. Quisque mattis mattis augue, a egestas mauris aliquam ac. Praesent non odio mi. Nam fermentum, turpis vitae rutrum interdum, massa dolor ultricies sapien, vel sodales dolor justo non orci. </p>
      </div>
      <Appfooter></Appfooter>
    </>
    
  );
}


export default AboutServicePlace;