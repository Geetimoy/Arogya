import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

function MyConsent(){
  return (
    <>
    <AppTop></AppTop>
    <div className="app-body">
      <h5 className="title">My Consent</h5>
      <div>
        <div class="custom-control custom-radio custom-control-inline mt-2"><input type="radio" id="dont_save_info" name="consent" class="custom-control-input" value="f" /><label class="custom-control-label no-style" for="dont_save_info">Don't save my information </label></div>
        <div class="custom-control custom-radio custom-control-inline mt-2"><input type="radio" id="save_info" name="consent" class="custom-control-input" value="t" checked /><label class="custom-control-label no-style" for="save_info">Yes, save my information </label></div>
        <div class="custom-control custom-radio custom-control-inline mt-2"><input type="radio" id="withdraw_consent" name="consent" class="custom-control-input" value="f" /><label class="custom-control-label no-style" for="withdraw_consent">Withdraw my consent </label></div>
      </div>
    </div>
    <Appfooter></Appfooter>
    </>
    
  );
}

export default MyConsent;
