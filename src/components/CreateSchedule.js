import { useState, useContext } from 'react';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";
import CraeteScheduleSingle from './CreateScheduleSingle';
import CreateScheduleMultiple from './CreateScheduleMultiple';
import CreateScheduleMultipletime from './CreateScheduleMultipletime';
import CreateScheduleRepeat from './CreateScheduleRepeat';

function CraeteSchedule(){

  const systemContext           = useContext(SystemContext);
  const [urlParam, setUrlParam] = useState(useParams());
  const scheduleType            = urlParam.scheduleType;

  return(
    <>
      {scheduleType === "single" && <CraeteScheduleSingle/>} 
      {scheduleType === "repeat" && <CreateScheduleRepeat/>}
      {scheduleType === "multiple" && <CreateScheduleMultiple/>}
      {scheduleType === "multipletime" && <CreateScheduleMultipletime/>}
    </>
  )
}


export default CraeteSchedule;