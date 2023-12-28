import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './TermsCondition.css'

function TermsCondition (){
  return(
    <>
    <AppTop></AppTop>
      <div className="app-body">
        <h5 className="title">Terms and Condition</h5>
      </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default TermsCondition;