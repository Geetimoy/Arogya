import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './ContactUs.css'

function ContactUs(){
  return(
    <>
      <AppTop></AppTop>
      <div className="app-body">
        <h5 className="title">Conatct Us</h5>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default ContactUs;