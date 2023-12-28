import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

function Help(){
  return(
      <>
        <AppTop></AppTop>
          <div className="app-body">
              <h5 className="title">Help</h5>
              <p>Phasellus finibus et enim ut placerat. Vestibulum ante neque, pulvinar nec dictum at, aliquam sollicitudin erat. Donec nisi nibh, egestas ut elit ut, faucibus sollicitudin leo. Nullam non turpis sagittis, luctus lacus id, posuere arcu.</p>
          </div>
        <Appfooter></Appfooter>
      </>
  );
}


export default Help;