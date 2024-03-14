import React from 'react';
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

import axios from "axios";
import "./LandingPage.css";
import { useState, useEffect } from "react";

function LandingPage() {
  const [page, setPage] = useState(1);
  const iNeedToBeProximityData = [{ value: '', label: '--Select an option--' },{ value: 'Corporate Headquarters', label: 'Corporate Headquarters' },{ value: 'University', label: 'University' },{ value: 'Hospitals', label: 'Hospitals' },{ value: 'No specific area required', label: 'No specific area required' },];
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [answer, setAnswer] = useState("");

  const [sucess,setSucess]=useState(false);
  useEffect(() => {
    generateRandomNumbers();
  }, []);
  const generateRandomNumbers = () => {
    const randomNumber1 = Math.floor(Math.random() * 20) + 1;
    const randomNumber2 = Math.floor(Math.random() * 20) + 1;
    setNum1(randomNumber1);
    setNum2(randomNumber2);
    // setAnswer(null);
    
  };

 
  const stayLengthFields=[
    {value:'',label: '--Select an option--'},
    {value:"30-60 days", label:"30-60 days"},
    {value:"60-90 days", label:"60-90 days"},
    {value:"90-120 days", label:"90-120 days"},
  ]
  const relocationOptions = [
    { value: '', label: '--Select an option--' },
    { value: 'Managed', label: 'Managed' },
    { value: 'Lump Sum', label: 'Lump Sum' },
    { value: 'Other', label: 'Other' },
    { value: 'Not applicable', label: 'Not applicable' },
  ];
  const referralOptions = [
    { value: '', label: '--Select an option--' },
    { value: 'Former client', label: 'Former client' },
    { value: 'Online search', label: 'Online search' },
    { value: 'Referred by property', label: 'Referred by property' },
    { value: 'Referred by employer', label: 'Referred by employer' },
    { value: 'Other', label: 'Other' },
  ];
  const movingAreaOptions = [
    { value: "Work", label: "Work" },
    { value: "Company on behalf of employee", label: "Company on behalf of employee" },
    { value: "Retirement", label: "Retirement" },
    { value: "Healthcare access", label: "Healthcare access" },
    { value: "Family Events", label: "Family Events" },
    { value: "School education", label: "School education" }
  ];
  const transitionStLouisOptions = [
    { value: "Selling home", label: "Selling home" },
    { value: "Home renovation", label: "Home renovation" },
    { value: "Natural disaster", label: "Natural disaster" },
    { value: "Divorce", label: "Divorce" },
    { value: "Other", label: "Other" }
  ];
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    preferredMethodForContact: "",
    reasonForEnquiry: "",
    movingAreaFields:[],
    transitionStLouisFields:[],
    bedrooms:[],
    lookingForBedroomType:[],
    howDoYouHearAboutUs:"",
    proximityType:"",
    stayLengthDays:"",
    date:"",
    whatTypeRelocationBenifit
:"",   
checkingNumberError:"",
  });
  
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    preferredMethodForContact: "",
    reasonForEnquiry: "",
    movingAreaFields:"",
    transitionStLouisFields:"",
    proximityType:"",
    stayLengthDays:"",
    date:"",
    whatTypeRelocationBenifit:"",
    lastPageError:"",
    checkingNumberError:"",
    
    
  });

  const handleProximityChange = (e) => {
    setErrors((prevErrors)=>({...prevErrors,lastPageError:""}))
    const selectedValue = e.target.value;
    setFormData((prevData) => ({...prevData,proximityType: selectedValue,}));
  
  };

  const handleHowDoYouHearAboutUs=(e)=>{
    setErrors((prevErrors)=>({...prevErrors, lastPageError:"", }))
    setFormData((prevData)=>({...prevData,howDoYouHearAboutUs:e.target.value,}))
    if ( formData.proximityType==="" ||
    formData.stayLengthDays==="" ||
    formData.date==="" ||
    formData.bedrooms.length === 0 ||
    formData.lookingForBedroomType.length === 0 ||
    formData.handleHowYouHearAboutUs === "" ||
    formData.whatTypeRelocationBenifit===""){
      setErrors((prevErrors)=>({...prevErrors,lastPageError:"All fields are required",}))
    }else{
      setErrors((prevErrors)=>({...prevErrors, lastPageError:"", }))
    }
  }


  const handleWhatType=(e)=>{
    setErrors((prevErrors)=>({...prevErrors, lastPageError:"" }))
    setFormData((prevData)=>({...prevData, whatTypeRelocationBenifit:e.target.value,}))
  }

  const handleStayLength=(e)=>{
    setErrors((prevErrors)=>({...prevErrors, lastPageError:"" }))
    const selectedValue = e.target.value;
    setFormData((prevData)=>({...prevData,stayLengthDays:selectedValue, }))
  }
  const handledate=(e)=>{
    setErrors((prevErrors)=>({...prevErrors, lastPageError:"" }))
    const selectedValue = e.target.value;
    setFormData((prevData)=>({...prevData,date:selectedValue,}))
  }

  
  const handleData = (e) => {
    const { name, value, type, checked } = e.target;
    if (page === 1) {
      
        if (type === "radio" && (value === "email" || value === "phone")) {
          setErrors((prevErrors) => ({...prevErrors,[name]: !checked ? `Please select ${name}` : '',}));
          setFormData((prevData) => ({...prevData,[name]: checked ? value : "",reasonForEnquiry: checked ? value : "", 
          }));

        } else if (type === "checkbox") {
          setFormData((prevData) => ({...prevData,[name]: checked ? [...prevData[name], value] : prevData[name].filter((item) => item !== value),
          }));
        } else {
          setErrors((prevErrors) => ({...prevErrors,[name]: '',}));
          setFormData((prevData) => ({...prevData,[name]: value,}));
        }
      }
    if(page===2){
        if (type === "radio") {
            setErrors((prevErrors) => ({...prevErrors,[name]: !checked ? `Please select ${name}` : '',
            }));
            setFormData((prevData) => ({...prevData,[name]: checked ? value : "",reasonForEnquiry: checked ? value : "", 
            }));
    }
     else if (type === "checkbox") {
          if (formData.reasonForEnquiry === "movingArea") {
            setFormData((prevData) => ({...prevData,movingAreaFields: checked ? [...prevData.movingAreaFields, value] : prevData.movingAreaFields.filter((item) => item !== value),}));
          } else if (formData.reasonForEnquiry === "transitionStLouis") {
            setFormData((prevData) => ({ ...prevData,transitionStLouisFields: checked ? [...prevData.transitionStLouisFields, value] : prevData.transitionStLouisFields.filter((item) => item !== value), }));
          }}
        }
     
      
      }
  
  console.log(formData)
  console.log(page)

const validateFields = () => {
    console.log("Validating fields for page", page);
    const newErrors = {};
    const phoneNumberRegex=/^\d+$/;
    if (page === 1) {
        if (!formData.firstName) {
          newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
          newErrors.lastName = 'Last Name is required';
        }
        
        if (!formData.email || !formData.email.includes("@")) {
          newErrors.email = 'Email is required and must be valid';
        }
        
        if (!formData.phoneNumber || !phoneNumberRegex.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        if (!formData.preferredMethodForContact) {
          newErrors.preferredMethodForContact = 'Please select a contact method';
        }
        
      }
    if(page===2){
        if (!formData.reasonForEnquiry) {
            newErrors.reasonForEnquiry = 'Reason for Enquiry is required';
        
        }
        if(formData.reasonForEnquiry==="movingArea" && formData.movingAreaFields.length===0){
            newErrors.movingAreaFields = 'Please select at least one moving area option';
        }
        if (formData.reasonForEnquiry === "transitionStLouis" && formData.transitionStLouisFields.length === 0) {
            newErrors.transitionStLouisFields = 'Please select at least one transition option';
          }
    }
        console.log("Validation result:", Object.keys(newErrors).length === 0);
  
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      
  };

  console.log(errors)

const submitFormToServer = async() => {
    const newErrors = {};
    if (
      formData.proximityType==="" ||
      formData.stayLengthDays==="" ||
      formData.date==="" ||
      formData.bedrooms.length === 0 ||
      formData.lookingForBedroomType.length === 0 ||
      formData.howDoYouHearAboutUs === "" ||
      formData.whatTypeRelocationBenifit===""
    ) {
      newErrors.lastPageError = 'All fields are required';
      setErrors(newErrors);
    } else {
      console.log(num1,num2,answer)
      if(parseInt(num1)+parseInt(num2)===parseInt(answer)){
      newErrors.lastPageError = '';
      setErrors(newErrors);
      console.log("response succesfully sent", formData);

      const url = "https://a9riyj32x1.execute-api.ap-south-1.amazonaws.com/Prod/producerForTempoLeads";
      
      const response = await axios.post(url,formData);
      const fetchedData=await response.data
      console.log(fetchedData.message)
      // setAnswer(null)
      setSucess(true)
      generateRandomNumbers()
      if (fetchedData.message==="Data Send successfully"){
        setPage(page - 2)
        console.log('hi')
        setFormData({firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        preferredMethodForContact: "",
        reasonForEnquiry: "",
        movingAreaFields:[],
        transitionStLouisFields:[],
        bedrooms:[],
        lookingForBedroomType:[],
        handleHowDoYouHearAboutUs:"",
        proximityType:"",
        stayLengthDays:"",
        date:"",
        whatTypeRelocationBenifit
    :"", checkingNumberError:" "  })
      }
      }else{
        newErrors.checkingNumberError="Please calculate Correctly"
        setErrors(newErrors)
      }
      
    }
  };
  
const nextPage = () => {
    if (validateFields()) {
      if (page === 1 && (formData.reasonForEnquiry !== "movingArea" && formData.reasonForEnquiry !== "transitionStLouis")) {
        const selectedContactMethod =
         formData.reasonForEnquiry === "email" ? "" : formData.reasonForEnquiry === "phone" ? "" : "";
        setFormData((prevData) => ({...prevData,reasonForEnquiry: selectedContactMethod,}));
      }
      console.log("Moving to next page", page + 1);
      setPage(page + 1);
    }
  };
  
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className='main_one_container'>
    <div className="main_container" >

       <div className="contact_text_details_container" >
            <h4 className="first_heading">GET IN TOUCH</h4>
            <h2 className="pleasure_text">It's our <span className="pleasure_text_span">pleasure</span></h2>
            <h2 className="paragraph">At Arch Interim we have an open-door policy. Give us a call, send us an email, or complete the form below for a dedicated client service representative.</h2>
            <h2  className="paragraph">Ready to learn more? Fill out this contact form with your information and someone from our team will reach out with the most appropriate solution for your relocation situation!</h2>
            <div className="contact_phone_log_container">
            <MdOutlinePhoneAndroid className='icon_size' />
            <h2 className="contact_details_text">645.345.0948</h2>
            </div>
            <div className="contact_phone_log_container">
            <MdOutlineMail className='icon_size'/>
            <h2 className="contact_details_text">info@archinterim.com</h2>
            </div>
            <div className="contact_phone_log_container">
            <SiGooglemaps className='icon_size'/>
            <h2 className="contact_details_text">897 Fee Fee Rd. | St. Louis, MO 63043</h2>
            </div>
            <div className="social_media_icons_container">
            <FaLinkedin className="linkedin"/>
            <FaSquareFacebook className="facebook"/>
            <FaInstagramSquare className="insta"/>
            </div>
      
        </div>


        <div className="contact_form_main_container" >
          <div className='second'>
          {sucess ? <p style={{color:"#6B6D6B",paddingTop:"20px",fontSize:"15px"}}>YOUR REQUEST WAS SUBMITTED SUCCESSFULLY! 🎉 SOMEONE FROM OUR TEAM WILL BE IN TOUCH SOON.</p>:null}
          <h4 className="contact_us_text">Contact Us</h4>
          <div className='page_container'>
              <div>
              <div className={page >= 1 ? "page page_active" : "page"}>1</div>
              </div>
              <div className={page>=2 ? "hr_line11" :"hr_line1" }/>
              <div className={page >= 2 ? "page page_active" : "page"}>
                2
              </div>
              <div className={page>=3 ? "hr_line11" :"hr_line1" }/>
              <div className={page >= 3 ? "page page_active" : "page"}>
                3
              </div>
          </div>
          
{page === 1 ? (
              <div className="first_contact_page">
                
                <input type="text" placeholder="First Name*" className="input_field text_color" name="firstName" value={formData.firstName} onChange={handleData}/>
                {errors.firstName && <p style={{ color: 'red', fontSize:"12px", marginTop:"0px",paddingBottom:"5px"}}>{errors.firstName}</p>}

                <input type="text" placeholder="Last Name*" className="input_field text_color" name="lastName" value={formData.lastName} onChange={handleData} required/>
                {errors.lastName && <p style={{ color: 'red',fontSize:"12px", marginTop:"0px",paddingBottom:"5px" }}>{errors.lastName}</p>}
                <input type="email" placeholder="Email*" className="input_field text_color" name="email" value={formData.email}onChange= {handleData} required/>
                {errors.email && <p style={{ color: 'red',fontSize:"12px", marginTop:"0px",paddingBottom:"5px" }}>{errors.email}</p>}

                <input type="tel" placeholder="Phone Number*"  className="input_field text_color" name="phoneNumber" value={formData.phoneNumber}
                  onChange={handleData}
                  required
                />
                {errors.phoneNumber && <p style={{ color: 'red',fontSize:"12px", marginTop:"0px",paddingBottom:"5px" }}>{errors.phoneNumber}</p>}

                <div className="email_container">
                    <label style={{textAlign:"left"}} className='text_color'>Preferred method of contact<span className="star">*</span></label>
                  <div className="email">
                      <input id="email" type="radio" name="preferredMethodForContact" value="email" checked={formData.preferredMethodForContact === "email"} onChange={handleData} className='text_color'required />
                       <label htmlFor='email' className="radio_label text_color" style={{fontSize:"15px",paddingLeft:"3px"}}>Email</label>
                  </div>
                  <div className="phone_number">
                    <input id='phoneNumber' type="radio"  name="preferredMethodForContact" value="phone"  className='text_color' checked={formData.preferredMethodForContact === "phone"} onChange={handleData}required />
                    <label htmlFor='phoneNumber' className="radio_label text_color"  style={{fontSize:"15px",paddingLeft:"3px"}}>Phone Number</label>
                  </div>
                </div>
                {errors.preferredMethodForContact && <p style={{ color: 'red',fontSize:"12px", marginTop:"0px",paddingBottom:"5px",fontWeight:"370" }}>{errors.preferredMethodForContact}</p>}
                <div className="first_page_button_container">
                  <button type="button" className="button" onClick={nextPage}>
                    Next
                  </button>
                </div>
              </div>
            ) : null}
           
{page === 2 ? (
              <div className="second_page_container">
                <div className='reasonForInquiryContainer'>
                  <label htmlFor="movingArea" className='text_color'>Reason for inquiry<span className="star">*</span></label>
                  <div className='movingArea'>
                  <input type="radio" id="movingArea" name="reasonForEnquiry" value="movingArea" checked={formData.reasonForEnquiry === "movingArea"} onChange={handleData} required />
                  <label htmlFor="movingArea"  style={{fontSize:"15px", paddingLeft:"4px"}} className='text_color'>Moving area</label>
                  </div>
              <div className='movingArea'>
                  <input type="radio" id="transitionStLouis" name="reasonForEnquiry" value="transitionStLouis" checked={formData.reasonForEnquiry === "transitionStLouis"}onChange={handleData}/>
                <label htmlFor="transitionStLouis" className='text_color'  style={{fontSize:"15px", paddingLeft:"4px"}}>Transition within ST. Louis</label>
                </div>
                {errors.reasonForEnquiry && <p style={{ color: 'red' ,fontSize:"12px"}}>{errors.reasonForEnquiry}</p>}
                </div>
                <div>
                {formData.reasonForEnquiry === "movingArea" && (
  <div className="movingAreaFileds">
                <label className="moving_area_fields text_color">Moving to area for....<span className="star">*</span></label>
                {movingAreaOptions.map(option => (
                  <label key={option.value} className="moving_area_fields text_color" style={{ fontSize: "15.5px" }}>
                    <input
                      type="checkbox"
                      name="movingAreaFields"
                      value={option.value}
                      checked={formData.movingAreaFields.includes(option.value)}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                          ...prevData,
                          movingAreaFields: checked
                            ? [...prevData.movingAreaFields, option.value]
                            : prevData.movingAreaFields.filter((value) => value !== option.value),
                        }));
                        setErrors((prevErrors) => ({ ...prevErrors, movingAreaFields: "" }));
                      }}
                    />
                    {option.label}
                  </label>
                ))}
                {errors.movingAreaFields && <p style={{ color: 'red', fontSize: "12px" }}>{errors.movingAreaFields}</p>}
              </div>
            )} </div>
              <div>
                    {formData.reasonForEnquiry === "transitionStLouis" && (
                      <div className="transitionStLouis">
                        <label className="moving_area_fields text_color" >Transitioning within St Louis for...<span className="star">*</span></label>
                        {transitionStLouisOptions.map(option => (
                          <label key={option.value} className="moving_area_fields text_color" style={{fontSize:"15.5px"}}>
                            <input
                              type="checkbox"
                              name="transitionStLouisFields"
                              value={option.value}
                              checked={formData.transitionStLouisFields.includes(option.value)}
                              onChange={(e) => {
                                const { checked } = e.target;
                                setFormData((prevData) => ({
                                  ...prevData,
                                  transitionStLouisFields: checked
                                    ? [...prevData.transitionStLouisFields, option.value]
                                    : prevData.transitionStLouisFields.filter((value) => value !== option.value),
                                }));
                                setErrors((prevErrors) => ({ ...prevErrors, transitionStLouisFields: "" }));
                              }}
                            />
                            {option.label}
                          </label>
                        ))}
                        {errors.transitionStLouisFields && <p style={{ color: 'red', fontSize: "12px",marginTop:"0px",paddingBottom:"5px" }}>{errors.transitionStLouisFields}</p>}
                      </div>
                    )}

                </div>
                <div className='second_page_button_container'>
                  <button type="button" className='button' onClick={prevPage}>Prev</button>
                  <button type="button" className='button' onClick={nextPage}>Next</button>
                </div>
              </div>

            ) : null}

{page===3 ? <div className="third_container">

            <div className='iNeedToBeProximity_container'>
                    <label style={{textAlign:"left",paddingBottom:"3px"}} className='text_color'>I need to be in proximity to...<span className="star">*</span></label>
                    <select className="select_element text_color" value={formData.proximityType} onChange={handleProximityChange}>
                      {iNeedToBeProximityData.map((option) => ( <option className='text_color' key={option.value} value={option.value} disabled={option.value === ''}> {option.label} </option>))}
                    </select>
            </div>

        <div className='stay_length_container'>
                    <label className='stay_length_text text_color' style={{paddingBottom:"3px"}}>Stay Length<span className="star">*</span></label>
                      <select className="select_element text_color" value={formData.stayLengthDays}  onChange={handleStayLength}>
                        {stayLengthFields.map((option) => (<option className='text_color' key={option.value} value={option.value}>{option.label}</option>))}
                      </select>
        </div>

      <div className='arrival_date'>
                  <label className='arrival_data_text text_color' style={{paddingBottom:"3px"}} >Arrival date<span className="star">*</span></label>
                  <input type="date" className='date_field text_color' value={formData.date}  onChange={handledate}/>
      </div>

      <div className='bedrooms_container'>
                  <label style={{textAlign:"left"}} className='text_color'>Bedrooms (select all that apply)<span className="star">*</span></label>
                  <label className='text_color' style={{fontSize:"15.8px",paddingBottom:"8px",paddingTop:"5px"}}> <input type="checkbox"  name="1_bedroom"   value="1_bedroom" checked={formData.bedrooms.includes("1_bedroom")}
                            onChange={(e) => {
                              setErrors((prevErrors)=>({...prevErrors,lastPageError:""}))
                            const { checked } = e.target;
                            setFormData((prevData) => ({...prevData,  bedrooms: checked  ? [...prevData.bedrooms, "1_bedroom"]  : prevData.bedrooms.filter((value) => value !== "1_bedroom"),
                            }))}}/>1 Bedroom Studio</label>

                <label style={{fontSize:"15.5px",paddingBottom:"8px"}} className='text_color'>  
                  <input type="checkbox"  name="2_bedrooms" value="2_bedrooms" checked={formData.bedrooms.includes("2_bedrooms")} onChange={(e) => {
                        const { checked } = e.target;
                        setErrors((prevErrors)=>({...prevErrors,lastPageError:""}))
                        setFormData((prevData) => ({ ...prevData, bedrooms: checked ? [...prevData.bedrooms, "2_bedrooms"]
                            : prevData.bedrooms.filter((value) => value !== "2_bedrooms"),
                        })) }}/>2 Bedrooms</label>

                  <label style={{fontSize:"15.5px",paddingBottom:"8px"}} className='text_color'> <input type="checkbox"  name="3+_bedrooms" value="3+_bedrooms" checked={formData.bedrooms.includes("3+_bedrooms")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setErrors((prevErrors)=>({...prevErrors,lastPageError:""}))
                        setFormData((prevData) => ({ ...prevData, bedrooms: checked ? [...prevData.bedrooms, "3+_bedrooms"]
                            : prevData.bedrooms.filter((value) => value !== "3+_bedrooms"),
                        })) }}/>3+ Bedrooms</label>
        </div>

      <div className='what_type_container'>
                      <label style={{textAlign:"left",paddingBottom:"3px"}} className='text_color'>What type of relocation benefit are you working with?<span className="star">*</span></label>
                    <select className="select_element_what_type_of_relocation text_color" value={formData.whatTypeRelocationBenifit} onChange={handleWhatType}>
                    {relocationOptions.map((option) => ( <option key={option.value} value={option.value} disabled={option.value === ''}> {option.label} </option>))}
                    </select>
            <div  className='bedrooms_container2'>
                <label className='text_color' style={{textAlign:"left",fontSize:"15.5px",paddingBottom:"8px"}}>
                <input type="checkbox" name="I am looking for furnished housing" value="I am looking for furnished housing"
                    checked={formData.lookingForBedroomType.includes("I am looking for furnished housing")}
                    onChange={(e) => { const { checked } = e.target;setErrors((prevErrors)=>({...prevErrors,lastPageError:""})); setFormData((prevData) => ({...prevData, lookingForBedroomType: checked
                        ? [...prevData.lookingForBedroomType, "I am looking for furnished housing"]
                        : prevData.lookingForBedroomType.filter((value) => value !== "I am looking for furnished housing"),
                    })); }}/>I am looking for furnished housing</label>

                <label style={{textAlign:"left",fontSize:"15.5px",paddingBottom:"8px"}} className='text_color'><input  type="checkbox"
                    name="I am flexible with the dates of my stay"
                    value="I am flexible with the dates of my stay"
                    checked={formData.lookingForBedroomType.includes("I am flexible with the dates of my stay")}
                    onChange={(e) => {
                    const { checked } = e.target;
                    setErrors((prevErrors)=>({...prevErrors,lastPageError:""}))
                    setFormData((prevData) => ({
                        ...prevData,
                        lookingForBedroomType: checked
                        ? [...prevData.lookingForBedroomType, "I am flexible with the dates of my stay"]
                        : prevData.lookingForBedroomType.filter((value) => value !== "I am flexible with the dates of my stay"),
                    }));

                    }}/>I am flexible with the dates of my stay</label>
            <label style={{textAlign:"left",fontSize:"15.5px",paddingBottom:"8px"}} className='text_color'><input type="checkbox" 
                    name="I am flexible with the number of bedrooms"
                    value="I am flexible with the number of bedrooms"
                    checked={formData.lookingForBedroomType.includes("I am flexible with the number of bedrooms")}
                    onChange={(e) => {
                    const { checked } = e.target;
                    setErrors((prevErrors)=>({...prevErrors,lastPageError:""}))
                    setFormData((prevData) => ({ ...prevData,lookingForBedroomType: checked ? [...prevData.lookingForBedroomType, "I am flexible with the number of bedrooms"]
                        : prevData.lookingForBedroomType.filter((value) => value !== "I am flexible with the number of bedrooms"),
                    })); }}/>I am flexible with the number of bedrooms</label>
                  </div>

      </div>

      <div className='how_did_hear_container'>
              <label style={{textAlign:"left",paddingBottom:"3px"}} className='text_color'>How did you hear about us?<span className="star">*</span></label>
              <select className="select_element text_color" value={formData.howDoYouHearAboutUs} onChange={handleHowDoYouHearAboutUs}>
                {referralOptions.map((option) => ( <option key={option.value} value={option.value} disabled={option.value === ""}>
                    {option.label} </option>))}
                </select>
                {errors.lastPageError && <p style={{ color: 'red' ,fontSize:"12px"}}>{errors.lastPageError}</p>}
      </div>
      <div className='numbers_container'>
      <p style={{color:"#6B6D6B"}}>{num1} + {num2} = 
        <input className="numbers_input_field" type="text" placeholder='?' value={answer}  onChange={(e) => setAnswer(e.target.value)} />
      </p>
      {errors.checkingNumberError && <p style={{ color: 'red' ,fontSize:"12px",marginTop:"0px",paddingBottom:"6px"}}>{errors.checkingNumberError}</p>}
   
    </div>
     
      <div className='third_page_button_container'>
                <button type="button" className='button' onClick={prevPage}>Prev</button> 
                <button type="button" className='button' onClick={submitFormToServer}>Send</button>
      </div>
           
          </div>
        :null }
          </div>
        </div>

        </div>
      </div>
   
  );
}

export default LandingPage;
