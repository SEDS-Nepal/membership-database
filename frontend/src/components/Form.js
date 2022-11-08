import React, { useState } from 'react'
import Education from './Education';
import Job from './Job';
import PersonalInfo from './PersonalInfo';
import Textarea from './Textarea';

function Form() {

    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "",
        middleName:"",
        lastName:"",
        email:"",
        number:"",
        personsid: "",
        city:"",
        province:"",
        postalcode:"",
        education:"",
        collegeName:"",
        collegeAddress:"",
        major:"",
        year:"",
        collegeWebsite:"",
        job:"",
        companyName:"",
        companyAddress:"",
        position:"",
        linkedinId:"",
        ques1:"",
        ques2:"",
    });
    const FormTitles = ["Personal Info", " Education", "Job", "Question"];

    const PageDisplay = () => {
        if(page === 0) {
            return <PersonalInfo formData={formData} setFromData={setFormData} />
        }
        else if (page === 1){
            return <Education formData={formData} setFromData={setFormData}/>
        }
        else if (page === 2){
            return <Job formData={formData} setFromData={setFormData}/>
        }
        else {
            return <Textarea formData={formData} setFromData={setFormData}/>
        }
    };
    return (
        <div className='form'>
            <div className='progressbar'>
                <div style={{width: page === 0 ? "25%" : page === 1? "50%" : page === 2 ?  "75%" : "100%"}}></div>
            </div>
            <div className='header'><h1>{FormTitles[page]}</h1></div>
            <div className='form-container'>
                <div className='formbody'>{PageDisplay()}</div>
                <div className='Footer'>
                    <button className='prev'
                        disabled={page === 0}
                        onClick={() => {
                            setPage((currPage) => currPage - 1);
                        }}>
                        Prev</button>
                    <button className='next'
                        onClick={() => {
                           if(page === FormTitles.length - 1){
                            console.log(formData);
                            alert("Form Submitted");
                           }
                           else{
                            setPage((currPage) => currPage +1 );
                           }
                        }}>
                        {page === FormTitles.length-1 ? "Submit" : "Next"} </button>
                </div>
            </div>


        </div>
    )
}

export default Form
