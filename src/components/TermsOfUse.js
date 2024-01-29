
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

//import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";

import './TermsCondition.css'

import { Link } from "react-router-dom";
import SystemContext from "../context/system/SystemContext";
import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
import { useContext, useState, useEffect } from 'react';

function TermsCondition (){

  const systemContext = useContext(SystemContext);

  const [data, setData] = useState({page_content:'', page_title:''});

  let jsonData = {};
      // jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TOKEN;
      jsonData['device_token']          = DEVICE_TYPE;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');

      // jsonData["page_key"] = localStorage.getItem('page_key');
      jsonData["page_key"] = "SEVAA_UKHRA_TERMS_OF_USE";
      jsonData["system_id"] = "ukhra.serviceplace.org.in";

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${API_URL}/staticPage`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
            });
            
            const responseData = await response.json();
            console.log(responseData.data.results[0]);
            
            setData(responseData.data.results[0]);
            // console.log('Hi');
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchData();
        // eslint-disable-next-line
      }, []);

  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Terms of Use</span>
        </div>
        <div className='login-box terms-condition'>
          {/* <img src={logotelehealth} className="m-auto mb-3" alt="logo" /> */}
          <img src={systemContext.systemDetails.thp_app_logo_url} className="m-auto mb-3" alt={systemContext.systemDetails.thp_system_name} />

          <h5 className='title'>{data.page_title}</h5>
          <p dangerouslySetInnerHTML={{ __html: data.page_content }}></p>
          {/* <p>LAST REVISION: 26-March-2023</p> */}
          {/* <p>PLEASE READ THIS TERMS OF USE AGREEMENT CAREFULLY. BY USING THIS WEBSITE OR MOBILE APP, YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.</p>
          <p>This Terms of Service Agreement (the "Agreement") governs your use of this website or the Mobile App, https://rgvn.serviceplace.org.in/telehealth/ (the "Website & App"), RGVN ("Business Name") offer of products for purchase on this Website, or your purchase of products available on this Website. This Agreement includes, and incorporates by this reference, the policies and guidelines referenced below. RGVN reserves the right to change or revise the terms and conditions of this Agreement at any time by posting any changes or a revised Agreement on this Website & App. RGVN will alert you that changes or revisions have been made by indicating on the top of this Agreement the date it was last revised. The changed or revised Agreement will be effective immediately after it is posted on this Website & App. Your use of the Website & App following the posting any such changes or of a revised Agreement will constitute your acceptance of any such changes or revisions. RGVN encourages you to review this Agreement whenever you visit the Website & App to make sure that you understand the terms and conditions governing use of the Website & App. This Agreement does not alter in any way the terms or conditions of any other written agreement you may have with RGVN for other products or services. If you do not agree to this Agreement (including any referenced policies or guidelines), please immediately terminate your use of the Website & App. If you would like to print this Agreement, please click the print button on your browser toolbar.</p>
          <p>I. PRODUCTS</p>
          <p>Terms of Offer. This Website &amp; App offers for sale certain products (the "Products"). By placing an order for Products through this Website &amp; App, you agree to the terms set forth in this Agreement. 
          Customer Solicitation: Unless you notify our third party call center reps or direct RGVN sales reps, while they are calling you, of your desire to opt out from further direct company communications and solicitations, you are agreeing to continue to receive further emails and call solicitations RGVN and its designated in house or third party call team(s).</p>
          <p>Opt Out Procedure: We provide 3 easy ways to opt out of from future solicitations. 1. You may use the opt out link found in any email solicitation that you may receive. 2. You may also choose to opt out, via sending your email address to: rgvn-tech@serviceplace.org.in.</p>
          <p>3. You may send a written remove request to House No. 55, Near Bye Lane No. 6, Rajgarh Main Road, Guwahati – 781003. </p>
          <p>Proprietary Rights. RGVN has proprietary rights and trade secrets in the Products. You may not copy, reproduce, resell or redistribute any Product manufactured and/or distributed by RGVN. RGVN also has rights to all trademarks and trade dress and specific layouts of this webpage, including calls to action, text placement, images and other information.</p>
          <p>Sales Tax. If you purchase any Products, you will be responsible for paying any applicable sales tax.</p>
          <p>II. WEBSITE</p>
          <p>Content; Intellectual Property; Third Party Links. In addition to making Products available, this Website &amp; App also offers information and marketing materials. This Website &amp; App also offers information, both directly and through indirect links to third-party websites, about nutritional and dietary supplements. RGVN does not always create the information offered on this Website &amp; App; instead the information is often gathered from other sources. To the extent that RGVN does create the content on this Website &amp; App, such content is protected by intellectual property laws of the India, foreign nations, and international bodies. Unauthorized use of the material may violate copyright, trademark, and/or other laws. You acknowledge that your use of the content on this Website &amp; App is for personal, noncommercial use. Any links to third-party websites are provided solely as a convenience to you. RGVN does not endorse the contents on any such third-party websites. RGVN  is not responsible for the content of or any damage that may result from your access to or reliance on these third-party websites. If you link to third-party websites, you do so at your own risk.</p>
          <p>License. By using this Website &amp; App, you are granted a limited, non-exclusive, non-transferable right to use the content and materials on the Website &amp; App in connection with your normal, noncommercial, use of the Website &amp; App. You may not copy, reproduce, transmit, distribute, or create derivative works of such content or information without express written authorization from RGVN or the applicable third party (if third party content is at issue).</p>
          <p>Posting. By posting, storing, or transmitting any content on the Website &amp; App, you hereby grant RGVN a perpetual, worldwide, non-exclusive, royalty-free, assignable, right and license to use, copy, display, perform, create derivative works from, distribute, have distributed, transmit and assign such content in any form, in all media now known or hereinafter created, anywhere in the world. RGVN does not have the ability to control the nature of the user-generated content offered through the Website &amp; App. You are solely responsible for your interactions with other users of the Website &amp; App and any content you post. RGVN is not liable for any damage or harm resulting from any posts by or interactions between users. RGVN reserves the right, but has no obligation, to monitor interactions between and among users of the Website &amp; App and to remove any content RGVN  deems objectionable, in MuscleUP Nutrition 's sole discretion.</p>
          <p>III. DISCLAIMER OF WARRANTIES</p>
          <p>YOUR USE OF THIS WEBSITE AND/OR PRODUCTS ARE AT YOUR SOLE RISK. THE WEBSITE AND PRODUCTS ARE OFFERED ON AN "AS IS" AND "AS AVAILABLE" BASIS. RGVN EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT WITH RESPECT TO THE PRODUCTS OR WEBSITE CONTENT, OR ANY RELIANCE UPON OR USE OF THE WEBSITE CONTENT OR PRODUCTS. ("PRODUCTS" INCLUDE TRIAL PRODUCTS.)</p>
          <p>WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, RGVN  MAKES NO WARRANTY:</p>
          <p>THAT THE INFORMATION PROVIDED ON THIS WEBSITE IS ACCURATE, RELIABLE, COMPLETE, OR TIMELY.
            THAT THE LINKS TO THIRD-PARTY WEBSITES ARE TO INFORMATION THAT IS ACCURATE, RELIABLE, COMPLETE, OR TIMELY.
            NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM THIS WEBSITE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN. 
            AS TO THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE PRODUCTS OR THAT DEFECTS IN PRODUCTS WILL BE CORRECTED. 
            REGARDING ANY PRODUCTS PURCHASED OR OBTAINED THROUGH THE WEBSITE.
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.</p>
            <p>IV. LIMITATION OF LIABILITY
              RGVN ENTIRE LIABILITY, AND YOUR EXCLUSIVE REMEDY, IN LAW, IN EQUITY, OR OTHWERWISE, WITH RESPECT TO THE WEBSITE CONTENT AND PRODUCTS AND/OR FOR ANY BREACH OF THIS AGREEMENT IS SOLELY LIMITED TO THE AMOUNT YOU PAID, LESS SHIPPING AND HANDLING, FOR PRODUCTS PURCHASED VIA THE WEBSITE.
              RGVN WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES IN CONNECTION WITH THIS AGREEMENT OR THE PRODUCTS IN ANY MANNER, INCLUDING LIABILITIES RESULTING FROM (1) THE USE OR THE INABILITY TO USE THE WEBSITE CONTENT OR PRODUCTS; (2) THE COST OF PROCURING SUBSTITUTE PRODUCTS OR CONTENT; (3) ANY PRODUCTS PURCHASED OR OBTAINED OR TRANSACTIONS ENTERED INTO THROUGH THE WEBSITE; OR (4) ANY LOST PROFITS YOU ALLEGE.
              SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.</p>
              <p>V. INDEMNIFICATION
              You will release, indemnify, defend and hold harmless RGVN, and any of its contractors, agents, employees, officers, directors, shareholders, affiliates and assigns from all liabilities, claims, damages, costs and expenses, including reasonable attorneys' fees and expenses, of third parties relating to or arising out of (1) this Agreement or the breach of your warranties, representations and obligations under this Agreement; (2) the Website &amp; App content or your use of the Website &amp; App content; (3) the Products or your use of the Products (including Trial Products); (4) any intellectual property or other proprietary right of any person or entity; (5) your violation of any provision of this Agreement; or (6) any information or data you supplied to RGVN. When RGVN is threatened with suit or sued by a third party, RGVN may seek written assurances from you concerning your promise to indemnify RGVN; your failure to provide such assurances may be considered by RGVN to be a material breach of this Agreement. RGVN will have the right to participate in any defense by you of a third-party claim related to your use of any of the Website &amp; App content or Products, with counsel of RGVN choice at its expense. RGVN will reasonably cooperate in any defense by you of a third-party claim at your request and expense. You will have sole responsibility to defend RGVN against any claim, but you must receive RGVN prior written consent regarding any related settlement. The terms of this provision will survive any termination or cancellation of this Agreement or your use of the Website &amp; App or Products.</p>
              <p>VI. PRIVACY
              RGVN believes strongly in protecting user privacy and providing you with notice of MuscleUP Nutrition 's use of data. Please refer to RGVN privacy policy, incorporated by reference herein, that is posted on the Website &amp; App.</p>
              <p>VI. AGREEMENT TO BE BOUND
                By using this Website &amp; App or ordering Products, you acknowledge that you have read and agree to be bound by this Agreement and all terms and conditions on this Website &amp; App. </p>
              <p>VIII. GENERAL
                Force Majeure. RGVN will not be deemed in default hereunder or held responsible for any cessation, interruption or delay in the performance of its obligations hereunder due to earthquake, flood, fire, storm, natural disaster, act of God, war, terrorism, armed conflict, labor strike, lockout, or boycott.
                Cessation of Operation. RGVN may at any time, in its sole discretion and without advance notice to you, cease operation of the Website &amp; App and distribution of the Products.</p>
              <p>Entire Agreement. This Agreement comprises the entire agreement between you and RGVN and supersedes any prior agreements pertaining to the subject matter contained herein.</p>
              <p>Effect of Waiver. The failure of RGVN to exercise or enforce any right or provision of this Agreement will not constitute a waiver of such right or provision. If any provision of this Agreement is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties' intentions as reflected in the provision, and the other provisions of this Agreement remain in full force and effect.</p>
              <p>Governing Law; Jurisdiction. This Website &amp; App originates from the Guwahati, Assam. This Agreement will be governed by the laws of the State of Assam without regard to its conflict of law principles to the contrary. Neither you nor RGVN will commence or prosecute any suit, proceeding or claim to enforce the provisions of this Agreement, to recover damages for breach of or default of this Agreement, or otherwise arising under or by reason of this Agreement, other than in courts located in State of Assam. By using this Website &amp; App or ordering Products, you consent to the jurisdiction and venue of such courts in connection with any action, suit, proceeding or claim arising under or by reason of this Agreement. You hereby waive any right to trial by jury arising out of this Agreement and any related documents.</p>
              <p>Statute of Limitation. You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Website &amp; App or Products or this Agreement must be filed within one (1) year after such claim or cause of action arose or be forever barred.</p>
              <p>Waiver of Class Action Rights. BY ENTERING INTO THIS AGREEMENT, YOU HEREBY IRREVOCABLY WAIVE ANY RIGHT YOU MAY HAVE TO JOIN CLAIMS WITH THOSE OF OTHER IN THE FORM OF A CLASS ACTION OR SIMILAR PROCEDURAL DEVICE. ANY CLAIMS ARISING OUT OF, RELATING TO, OR CONNECTION WITH THIS AGREEMENT MUST BE ASSERTED INDIVIDUALLY.</p>
              <p>Termination. RGVN reserves the right to terminate your access to the Website &amp; App if it reasonably believes, in its sole discretion, that you have breached any of the terms and conditions of this Agreement. Following termination, you will not be permitted to use the Website &amp; App and RGVN may, in its sole discretion and without advance notice to you, cancel any outstanding orders for Products. If your access to the Website &amp; App is terminated, RGVN reserves the right to exercise whatever means it deems necessary to prevent unauthorized access of the Website &amp; App. This Agreement will survive indefinitely unless and until RGVN chooses, in its sole discretion and without advance to you, to terminate it.</p>
              <p>Domestic Use. RGVN makes no representation that the Website &amp; App or Products are appropriate or available for use in locations outside India. Users who access the Website &amp; App from outside India do so at their own risk and initiative and must bear all responsibility for compliance with any applicable local laws.</p>
              <p>Assignment. You may not assign your rights and obligations under this Agreement to anyone. RGVN may assign its rights and obligations under this Agreement in its sole discretion and without advance notice to you.
                BY USING THIS WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE YOU AGREE 
                TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.</p> */}
              
                <p>TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.</p>
              <p className='text-center'>&copy; {(new Date().getFullYear())} {systemContext.systemDetails.thp_domain_name}. {(systemContext.systemDetails.thp_system_id > 0) && <span>Powered by <Link to={systemContext.systemDetails.thp_main_ngo_url} target="_blank" className="primary-color">{systemContext.systemDetails.thp_system_name}</Link></span>}</p>
              <div className="text-center login-logo w-100">
              {(systemContext.systemDetails.thp_system_id > 0) && <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_ngo_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>}
              <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_sp_global_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TermsCondition;