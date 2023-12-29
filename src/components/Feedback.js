import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './Feedback.css'

function Feedback(){
  return(
    <>
      <AppTop></AppTop>
        <div className="app-body feedback">
          <h5 className="title">Feedback</h5>
          <p className="mb-0"><strong>Read Me</strong></p>
          <p className="mb-0 small">Your feedback is important to us. It helps us improve RGVN TeleHealth. </p>
          <p className="mb-0 small">How easy or difficult was it for you to use RGVN TeleHealth?</p>
          <p className="mb-0 small">How would you rate your experience with RGVN TeleHealth Service?</p>
          <form className="feedback-form">
            <div className="row">
              <div className="col-lg-12">
                <div className="normal-box mt-2"><span>Patient ID:</span>UP0033445576</div>
              </div>
              <div className="col-lg-12">
                <div className="normal-box mt-2"><span>How easy was the app to use:</span>
                    <div><button type="button" class="btn btn-outline-info waves-effect waves-light">Very Easy</button></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default Feedback;