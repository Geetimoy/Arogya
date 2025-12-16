import Appfooter from "../AppFooter";

function PastBmi(){
  return (
    <>
    <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to={`/childmalnutrition/growth-tracker/${editAccountKey}/${redirectedFrom}`} className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
             <h5 className='mx-2 mb-0'>Past Measurments {measurementLabel} </h5> 
          </div>
          <div className='app-top-right d-flex'> 
            <AppTopNotifications /> 
            <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}><FontAwesomeIcon icon={faEllipsisV} /></div>
            <div className='drop-menu'>
                <ul>
                  <li><Link to={"/aboutserviceplace"}>About Service Place</Link></li>
                  {
                    (systemContext.systemDetails.thp_system_id !== 0) && <li><Link to={"/about-ngo"}>About {systemContext.systemDetails.thp_system_name}</Link></li>
                  }
                  <li><Link to={"/contactus"}>Contact Us</Link></li>
                  <li><Link to={"/feedback"}>Feedback</Link></li>
                  <li><Link to={"/help"}>Help</Link></li>
                  <li><Link to={"/logout"}>Logout</Link></li>
                </ul>
            </div>
          </div>
        </div>
    </div>
    <div className='app-body create-patient-profiles create-child-malnutrition'>
      <table className='border-0 table mt-3'>
        <thead>
            <tr>
              <th>Date.</th> 
              <th>Age</th>
              <th>Weight</th>
              <th>WHO Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                  <td></td>
                  <td> Months</td>
                  <td> Kg </td> 
                  <td> Kg </td> 
                </tr>
          </tbody>
      </table>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default PastBmi;