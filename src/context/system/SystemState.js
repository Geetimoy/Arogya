import SystemContext from "./SystemContext";
import { useState } from "react";

const SystemState = (props) => {

  const [systemDetails, setSystemDetails] = useState({});

  const updateSystemDetails = (value) => {
    setSystemDetails(value);
  }

  return (
    <SystemContext.Provider value={{systemDetails, updateSystemDetails}}>
      {props.children}
    </SystemContext.Provider>
  )

}

export default SystemState;