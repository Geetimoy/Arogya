import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

function Feedback(){
  return(
    <>
      <AppTop></AppTop>
        <div className="app-body">
          <h5 className="title">Feedback</h5>
          <p>Aliquam gravida placerat nibh ac ullamcorper. Morbi viverra pretium lorem, eget vestibulum massa. Morbi eleifend tempor ante, nec dictum urna tristique id. Sed euismod mauris non magna tempor hendrerit. Vivamus elit nisl, blandit maximus neque interdum, tempus pretium orci. Proin id est sapien.</p>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default Feedback;