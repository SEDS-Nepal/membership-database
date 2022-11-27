import React, { useState } from 'react'
import Education from './Education';
import Job from './Job';
import PersonalInfo from './PersonalInfo';
import Textarea from './Textarea';
import Progressbar from './Progressbar';
import Update from './Update';
import axios from 'axios';
import { userSchema } from '../Validations/UserValidation';


function Form() {
   
    const [page, setPage] = useState(0);
    const [education, setEducation] = useState("college");
    const [formData, setFormData] = useState({
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            education_level: "",
            major: "",
            number: "",
            personsid: "",
            position: "",
            title: "",
            company_name: "",
            company_address: "",
            school_name: "",
            school_address: "",
            school_website: "",
            college_name: "",
            college_address: "",
            college_website: "",
            city: "",
            province: "",
            postal_code: "",
            form: ""
    });

    const FormTitles = ["Personal Info", " Education", "Job", "Question","Update"];
    const submitRegistration = async () => {
        const isValid = await userSchema.isValid(formData);
        console.log(isValid);

        await axios.post("http://localhost:8000/api/members/",formData)
        .then(res => console.log('posting data', res)).catch(err=>console.log(err))
  
 }


    const PageDisplay = () => {
        if(page === 0) {
            return <PersonalInfo formData={formData} setFromData={setFormData} setEducation={setEducation} />
        }
        else if (page === 1){
            return <Education formData={formData} setFromData={setFormData} education={education} />
        }
        else if (page === 2){
            return <Job formData={formData} setFromData={setFormData} />
        }
        else if (page === 3) {
            return <Textarea formData={formData} setFromData={setFormData} />
        }
        else {

            return <Update page={page} setPage={setPage}/>
        }
    };
    return (
        <div className='form'>
           <div className='header'>
                <Progressbar page={page}  />
             </div>
            <div className='form-container'>
                <div className='formbody'>{PageDisplay()}</div>
                <div className='Footer'>
                   <button className='prev'
                        disabled={page === 0}
                        hidden={page === 4}
                        onClick={() => {
                            setPage((currPage) => currPage - 1);
                        }}>
                           Prev </button>
                        
                    <button className='next'
                     hidden={page === 4}
                        onClick={() => {
                           if(page === FormTitles.length - 2){
                            {submitRegistration()}
                            console.log(formData);  
                            
                           }
                          
                            setPage((currPage) => currPage +1 );
                           
                        }}>
                        {page === FormTitles.length-2 ? "Submit" : "Next"} </button>
                </div>
            </div>


        </div>
    )
}

export default Form
