import React from 'react';
import CryptoJS from "crypto-js";
import { ENCYPTION_KEY } from "./util/Constants";
import BasicInformation from './BasicInformation';
import BasicInformationPatient from './BasicInformationPatient';
import BasicInformationDoctor from './BasicInformationDoctor';
import BasicInformationPharmacy from './BasicInformationPharmacy';
import BasicInformationYoungWomen from './BasicInformationYoungWomen';


export default function BasicInformationMain() {

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  console.log(decryptedLoginDetails.account_type);
  return (
    <>
      {decryptedLoginDetails.account_type === '3' && <BasicInformationPatient/>} 
      {decryptedLoginDetails.account_type === '4' && <BasicInformation/>}
      {decryptedLoginDetails.account_type === '5' && <BasicInformationDoctor/>}
      {decryptedLoginDetails.account_type === '6' && <BasicInformationPharmacy/>}
      {decryptedLoginDetails.account_type === '32' && <BasicInformationYoungWomen/>}
    </>
  )
}
