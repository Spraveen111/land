import React from 'react';
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import "./LandingPage.css";
import { useState } from "react";

function LandingPage() {
  const [page, setPage] = useState(1);
  const iNeedToBeProximityData = [
    { value: '', label: '--Select an option--' },
    { value: 'Corporate Headquarters', label: 'Corporate Headquarters' },
    { value: 'University', label: 'University' },
    { value: 'Hospitals', label: 'Hospitals' },
    { value: 'No specific area required', label: 'No specific area required' },
  ];
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
    handleHowDoYouHearAboutUs:"",
    
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
    
    
  });
  const handleProximityChange = (e) => {
    const selectedValue = e.target.value;
  
    setFormData((prevData) => ({
      ...prevData,
      proximityType: selectedValue,
    }));
  };
  const handleHowDoYouHearAboutUs=(e)=>{
    setFormData((prevData)=>({
        ...prevData,
        handleHowDoYouHearAboutUs:e.target.value,

    }))
  }
  const handleWhatType=(e)=>{
    setFormData((prevData)=>({
        ...prevData,
        whatTypeRelocationBenifit:e.target.value,
    }))
  }
  const handleStayLength=(e)=>{
    const selectedValue = e.target.value;
    setFormData((prevData)=>({
        ...prevData,
        stayLengthDays:selectedValue,
    }))
  }
  const handledate=(e)=>{
    const selectedValue = e.target.value;
    setFormData((prevData)=>({
        ...prevData,
        date:selectedValue,
    }))
  }
  
  const handleData = (e) => {
    const { name, value, type, checked } = e.target;
    if (page === 1) {
        if (type === "radio" && (value === "email" || value === "phone")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: !checked ? `Please select ${name}` : '',
          }));
          setFormData((prevData) => ({
            ...prevData,
            [name]: checked ? value : "",
            reasonForEnquiry: checked ? value : "", 
          }));
        } else if (type === "checkbox") {
          setFormData((prevData) => ({
            ...prevData,
            [name]: checked
              ? [...prevData[name], value]
              : prevData[name].filter((item) => item !== value),
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
          }));
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      }
    if(page===2){
        if (type === "radio") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: !checked ? `Please select ${name}` : '',
            }));
            setFormData((prevData) => ({
              ...prevData,
              [name]: checked ? value : "",
              reasonForEnquiry: checked ? value : "", 
            }));
            
    }
     else if (type === "checkbox") {
          if (formData.reasonForEnquiry === "movingArea") {
            setFormData((prevData) => ({
              ...prevData,
              movingAreaFields: checked
                ? [...prevData.movingAreaFields, value]
                : prevData.movingAreaFields.filter((item) => item !== value),
            }));
          } else if (formData.reasonForEnquiry === "transitionStLouis") {
            setFormData((prevData) => ({
              ...prevData,
              transitionStLouisFields: checked
                ? [...prevData.transitionStLouisFields, value]
                : prevData.transitionStLouisFields.filter((item) => item !== value),
            }));
          }
        }
    }
    
}
  
  console.log(formData)
  console.log(page)
const validateFields = () => {
    console.log("Validating fields for page", page);
    const newErrors = {};
    if (page === 1) {
        if (!formData.firstName) {
          newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
          newErrors.lastName = 'Last Name is required';
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
        }
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = 'Phone Number is required';
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
 
  const nextPage = () => {
    if (validateFields()) {
      if (page === 1 && (formData.reasonForEnquiry !== "movingArea" && formData.reasonForEnquiry !== "transitionStLouis")) {
        const selectedContactMethod =
          formData.reasonForEnquiry === "email"
            ? ""
            : formData.reasonForEnquiry === "phone"
            ? ""
            : "";
        setFormData((prevData) => ({
          ...prevData,
          reasonForEnquiry: selectedContactMethod,
        }));
      }
  
      console.log("Moving to next page", page + 1);
      setPage(page + 1);
    }
  };
  
  
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="main_container">
     
      <div>
        <div className="contact_form_main_container">
          <form>
            <h1 className="contact_us_text">Contact Us</h1>

{page === 1 ? (
              <div className="first_contact_page">
                <input
                  type="text"
                  placeholder="First Name*"
                  className="input_field"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleData}
                />
                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}

                <input
                  type="text"
                  placeholder="Last Name*"
                  className="input_field"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleData}
                  required
                />
                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}

                <input
                  type="email"
                  placeholder="Email*"
                  className="input_field"
                  name="email"
                  value={formData.email}
                  onChange={handleData}
                  required
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className="input_field"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleData}
                  required
                />
                {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}

                <div className="email_container">
                    <label>Preferred method of contact*</label>
                  <div className="email">
                    <input
                      type="radio"
                      name="preferredMethodForContact"
                      value="email"
                      checked={formData.preferredMethodForContact === "email"}
                      onChange={handleData}
                      required
                    />
                    <label className="radio_label">Email</label>
                  </div>
                  <div className="phone_number">
                    <input
                      type="radio"
                      name="preferredMethodForContact"
                      value="phone"
                      checked={formData.preferredMethodForContact === "phone"}
                      onChange={handleData}
                      required
                    />
                    <label className="radio_label">Phone Number</label>
                  </div>
                </div>
                {errors.preferredMethodForContact && <p style={{ color: 'red' }}>{errors.preferredMethodForContact}</p>}
                <div className="button_container">
                  <button type="button" className="button" onClick={nextPage}>
                    Next
                  </button>
                </div>
              </div>
            ) : null}
            
{page === 2 ? (
              <div className="second_page_container">
                <div className='reasonForInquiryContainer'>
                <label htmlFor="movingArea">Reason for inquiry*</label>
                <div className='movingArea'>
                    <input
                    type="radio"
                    id="movingArea"
                    name="reasonForEnquiry"
                    value="movingArea"
                    checked={formData.reasonForEnquiry === "movingArea"}
                    onChange={handleData}
                    required
                    />
                <label htmlFor="movingArea">Moving area</label>
                </div>
                <div className='movingArea'>
                    <input
                    type="radio"
                    id="transitionStLouis"
                    name="reasonForEnquiry"
                    value="transitionStLouis"
                    checked={formData.reasonForEnquiry === "transitionStLouis"}
                    onChange={handleData}/>
                <label htmlFor="transitionStLouis">Transition within ST. Louis</label>
                </div>
                {errors.reasonForEnquiry && <p style={{ color: 'red' }}>{errors.reasonForEnquiry}</p>}
                </div>
                <div>
{formData.reasonForEnquiry === "movingArea" && (
                <div className="movingAreaFileds">
                    <label className="moving_area_fields">Moving to area for....*</label>
                        <label className="moving_area_fields">
                        <input
                            type="checkbox"
                          name="movingAreaFields"
                        value="Work"
                        checked={formData.movingAreaFields.includes("Work")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            movingAreaFields: checked
                            ? [...prevData.movingAreaFields, "Work"]
                            : prevData.movingAreaFields.filter((value) => value !== "Work"),
                        }))
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            movingAreaFields: "", 
                        }));
                        }}/>Work</label>
                    <label className="moving_area_fields">
                    <input
                        type="checkbox"
                        name="movingAreaFields"
                        value="Company on behalf of employee"
                        checked={formData.movingAreaFields.includes("Company on behalf of employee")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            movingAreaFields: checked
                            ? [...prevData.movingAreaFields, "Company on behalf of employee"]
                            : prevData.movingAreaFields.filter((value) => value !== "Company on behalf of employee"),
                        }));
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            movingAreaFields: "", // Corrected the typo here
                        }));
                        }}
                    />
                    Company on behalf of employee
                    </label>
                    <label className="moving_area_fields">
                    <input
                        type="checkbox"
                        name="movingAreaFields"
                        value="Retirement"
                        checked={formData.movingAreaFields.includes("Retirement")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            movingAreaFields: checked
                            ? [...prevData.movingAreaFields, "Retirement"]
                            : prevData.movingAreaFields.filter((value) => value !== "Retirement"),
                        }));
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            movingAreaFields: "", 
                        }));
                        }}
                    />
                    Retirement
                    </label>
                    <label className="moving_area_fields">
                    <input
                        type="checkbox"
                        name="movingAreaFields"
                        value="Healthcare access"
                        checked={formData.movingAreaFields.includes("Healthcare access")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            movingAreaFields: checked
                            ? [...prevData.movingAreaFields, "Healthcare access"]
                            : prevData.movingAreaFields.filter((value) => value !== "Healthcare access"),
                        }));
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            movingAreaFields: "", 
                        }));
                        }}
                    />
                    Healthcare access
                    </label>
                    <label className="moving_area_fields">
                    <input
                        type="checkbox"
                        name="movingAreaFields"
                        value="Family Events"
                        checked={formData.movingAreaFields.includes("Family Events")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            movingAreaFields: checked
                            ? [...prevData.movingAreaFields, "Family Events"]
                            : prevData.movingAreaFields.filter((value) => value !== "Family Events"),
                        }));
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            movingAreaFields: "", 
                        }));
                        }}
                    />
                    Family Events
                    </label>
                    <label className="moving_area_fields">
                    <input
                        type="checkbox"
                        name="movingAreaFields"
                        value="School education"
                        checked={formData.movingAreaFields.includes("School education")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            movingAreaFields: checked
                            ? [...prevData.movingAreaFields, "School education"]
                            : prevData.movingAreaFields.filter((value) => value !== "School education"),
                        }));
                        }}
                    />
                    School education
                    </label>
                    <label className="moving_area_fields">
                    <input
                        type="checkbox"
                        name="movingAreaFields"
                        value="Other"
                        checked={formData.movingAreaFields.includes("Other")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            movingAreaFields: checked
                            ? [...prevData.movingAreaFields, "Other"]
                            : prevData.movingAreaFields.filter((value) => value !== "Other"),
                        }));
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            movingAreaFields: "", 
                        }));}}/>Other</label>
                    {errors.movingAreaFields && <p style={{ color: 'red' }}>{errors.movingAreaFields}</p>}
                    </div>)}
                </div>


<div>
{formData.reasonForEnquiry === "transitionStLouis" && (
                <div className="transitionStLouis">
                <label className="moving_area_fields">Transitioning within St Louis for...*</label>
                <label className="moving_area_fields">
                <input
                type="checkbox"
                name="transitionStLouisFields"
                value="Selling home"
                checked={formData.transitionStLouisFields.includes("Selling home")}
                onChange={(e) => {
                const { checked } = e.target;
                setFormData((prevData) => ({
                    ...prevData,
                    transitionStLouisFields: checked
                    ? [...prevData.transitionStLouisFields, "Selling home"]
                    : prevData.transitionStLouisFields.filter((value) => value !== "Selling home"),
                
                }))
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    transitionStLouisFields: "", // Corrected the typo here
                }));
                }}
                        />
                        Selling home
                        </label>
                        <label className="moving_area_fields">
                        <input
                type="checkbox"
                name="transitionStLouisFields"
                value="Home renovation"
                checked={formData.transitionStLouisFields.includes("Home renovation")}
                onChange={(e) => {
                    const { checked } = e.target;
                    setFormData((prevData) => ({
                        ...prevData,
                        transitionStLouisFields: checked
                            ? [...prevData.transitionStLouisFields, "Home renovation"]
                            : prevData.transitionStLouisFields.filter((value) => value !== "Home renovation"),
                    }));
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        transitionStLouisFields: "", // Corrected the typo here
                    }));
                }}
            />
                Home renovation
                </label>
                <label className="moving_area_fields">
                <input
                    type="checkbox"
                    name="transitionStLouisFields"
                    value="Natural disaster"
                    checked={formData.transitionStLouisFields.includes("Natural disaster")}
                    onChange={(e) => {
                    const { checked } = e.target;
                    setFormData((prevData) => ({
                        ...prevData,
                        transitionStLouisFields: checked
                        ? [...prevData.transitionStLouisFields, "Natural disaster"]
                        : prevData.transitionStLouisFields.filter((value) => value !== "Natural disaster"),
                    }));
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        transitionStLouisFields: "", // Corrected the typo here
                    }));
                    }}
                />
                Natural disaster
                </label>
                <label className="moving_area_fields">
                <input
                    type="checkbox"
                    name="transitionStLouisFields"
                    value="Divorce"
                    checked={formData.transitionStLouisFields.includes("Divorce")}
                    onChange={(e) => {
                    const { checked } = e.target;
                    setFormData((prevData) => ({
                        ...prevData,
                        transitionStLouisFields: checked
                        ? [...prevData.transitionStLouisFields, "Divorce"]
                        : prevData.transitionStLouisFields.filter((value) => value !== "Divorce"),
                    }));
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        transitionStLouisFields: "", // Corrected the typo here
                    }));
                    }}
                />
                Divorce
                </label>
                <label className="moving_area_fields">
                <input
                    type="checkbox"
                    name="transitionStLouisFields"
                    value="Other"
                    checked={formData.transitionStLouisFields.includes("Other")}
                    onChange={(e) => {
                    const { checked } = e.target;
                    setFormData((prevData) => ({
                        ...prevData,
                        transitionStLouisFields: checked
                        ? [...prevData.transitionStLouisFields, "Other"]
                        : prevData.transitionStLouisFields.filter((value) => value !== "Other"),
                    }));
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        transitionStLouisFields: "", // Corrected the typo here
                    }));
                    }}
                />Other
                </label>
            
            {errors.transitionStLouisFields && <p style={{ color: 'red' }}>{errors.transitionStLouisFields}</p>}
</div>)}





                </div>
                <div className='button_container'>
                  <button type="button" className='button' onClick={prevPage}>Prev</button>
                  <button type="button" className='button' onClick={nextPage}>Next</button>
                </div>
              </div>

            ) : null}



{page===3 ? <div className="third_container">
            <div className='iNeedToBeProximity_container'>
              <label >I need to be in proximity to...*</label>
              <select className="select_element" defaultValue="" onChange={handleProximityChange}>
                {iNeedToBeProximityData.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.value === ''}>
                    {option.label}
                    </option>
                ))}
            </select>
            </div>
            <div className='stay_length_container'>
              <label className='stay_length_text'>Stay Length*</label>
            <select  className="select_element" defaultValue="" onChange={handleStayLength}>
              {stayLengthFields.map((option)=>(
                <option key={option.value} value={option.value} disabled={option.value===""}>
                    {option.label}
                </option>
              ))}
            </select>
            </div>
            <div className='arrival_date'>
              <label className='arrival_data_text'>Arrival date*</label>
           <input type="date" className='date_field' onChange={handledate}/>
            </div>
            <div className='bedrooms_container'>
              <label>Bedrooms (select all that apply)*</label>
          <label>
             <input type="checkbox"   
                          name="1_bedroom"
                        value="1_bedroom" checked={formData.bedrooms.includes("1_bedroom")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            bedrooms: checked
                            ? [...prevData.bedrooms, "1_bedroom"]
                            : prevData.bedrooms.filter((value) => value !== "1_bedroom"),
                        }))
                        
                        }}/>1 Bedroom Studio</label>
          <label> <input type="checkbox"   
                          name="2_bedrooms"
                        value="2_bedrooms" checked={formData.bedrooms.includes("2_bedrooms")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            bedrooms: checked
                            ? [...prevData.bedrooms, "2_bedrooms"]
                            : prevData.bedrooms.filter((value) => value !== "2_bedrooms"),
                        }))
                        
                        }}/>2 Bedrooms</label>
          <label> <input type="checkbox"   
                          name="3+_bedrooms"
                        value="3+_bedrooms" checked={formData.bedrooms.includes("3+_bedrooms")}
                        onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            bedrooms: checked
                            ? [...prevData.bedrooms, "3+_bedrooms"]
                            : prevData.bedrooms.filter((value) => value !== "3+_bedrooms"),
                        }))
                        
                        }}/>3+ Bedrooms</label>
            </div>
            <div className='what_type_container'>
              <label style={{textAlign:"left"}}>What type of relocation benefit are you working with?*</label>
              <select className="select_element_what_type_of_relocation" defaultValue="" onChange={handleWhatType}>
                    {relocationOptions.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.value === ''}>
                        {option.label}
                        </option>
                    ))}
                    </select>
            <div className='bedrooms_container2'>
            <label>
                <input type="checkbox"
                    name="I am looking for furnished housing"
                    value="I am looking for furnished housing"
                    checked={formData.lookingForBedroomType.includes("I am looking for furnished housing")}
                    onChange={(e) => {
                    const { checked } = e.target;
                    setFormData((prevData) => ({
                        ...prevData,
                        lookingForBedroomType: checked
                        ? [...prevData.lookingForBedroomType, "I am looking for furnished housing"]
                        : prevData.lookingForBedroomType.filter((value) => value !== "I am looking for furnished housing"),
                    }));

                    }}/>I am looking for furnished housing</label>
            <label><input  type="checkbox"
                    name="I am flexible with the dates of my stay"
                    value="I am flexible with the dates of my stay"
                    checked={formData.lookingForBedroomType.includes("I am flexible with the dates of my stay")}
                    onChange={(e) => {
                    const { checked } = e.target;
                    setFormData((prevData) => ({
                        ...prevData,
                        lookingForBedroomType: checked
                        ? [...prevData.lookingForBedroomType, "I am flexible with the dates of my stay"]
                        : prevData.lookingForBedroomType.filter((value) => value !== "I am flexible with the dates of my stay"),
                    }));

                    }}/>I am flexible with the dates of my stay</label>
            <label><input type="checkbox"
                    name="I am flexible with the number of bedrooms"
                    value="I am flexible with the number of bedrooms"
                    checked={formData.lookingForBedroomType.includes("I am flexible with the number of bedrooms")}
                    onChange={(e) => {
                    const { checked } = e.target;
                    setFormData((prevData) => ({
                        ...prevData,
                        lookingForBedroomType: checked
                        ? [...prevData.lookingForBedroomType, "I am flexible with the number of bedrooms"]
                        : prevData.lookingForBedroomType.filter((value) => value !== "I am flexible with the number of bedrooms"),
                    }));

                    }}/>I am flexible with the number of bedrooms</label>
            </div>
            </div>
            <div className='how_did_hear_container'>
              <label>How did you hear about us?*</label>
              <select className="select_element" defaultValue="" onChange={handleHowDoYouHearAboutUs}>
                {referralOptions.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.value === ''}>
                    {option.label}
                    </option>
                ))}
                </select>
            </div>
            <div className='button_container'>
                <button type="button" className='button' onClick={prevPage}>Prev</button> 
                  <button type="button" className='button' >Send</button> </div>
           
          </div>
        :null }
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
