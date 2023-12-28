import React, { useRef } from 'react'
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

export default function Alert(props) {

  const toastSection = useRef(null);

  const showMessage = (type, heading, message) => { 
    toastSection.current.show({
      severity: type,
      summary: heading,
      detail: message,
      life: 3000,
    });
  };

  if(props.message && props.message !== ""){ 
    showMessage(props.type, props.heading, props.message);
  }

  return (
    <div>
      <Toast ref={toastSection} position="top-center"/>
    </div>
  )
}
