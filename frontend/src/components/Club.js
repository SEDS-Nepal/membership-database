import React, { useState } from 'react'
import { Formik, useFormik } from 'formik';
import { newChapterSchema } from '../Validations/NewChapterValidation';
import axios from 'axios';

const initialValues = {
    chapter_name: "",
    chapter_location: "",
    chapter_head: "",
    chapter_members: "",
    email: "",
    college_estd: "",
    college_name: "",
    college_address: "",
    college_website: "",
}

function Club() {

    const { values, errors, handleBlur, touched, handleChange, handleSubmit , isValid} = useFormik({
        initialValues: initialValues,
        validationSchema: newChapterSchema,
        onSubmit: async (values, action) => {
            console.log(values);
            await axios.post("http://127.0.0.1:8000/api/chapters/",values)
            .then(res => console.log('posting data', res)).catch(err=>console.log(err))
            action.resetForm();
        },
    })
    // console.log(isValid);
 
    
    return (
        <div className='container containerclub'>
            <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
                    <label htmlFor="inputchaptername4" className="form-label">Your Chapter Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id='inputchaptername4'
                        name='chapter_name'
                        placeholder="Your Chapter Name"
                        aria-label="Your Chapter Name"
                        value={values.chapter_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.chapter_name && touched.chapter_name ? (
                        <p className='errors'>{errors.chapter_name}</p>) : null}
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputLocation4" className="form-label">Location of your chapter</label>
                    <input
                        type="text"
                        className="form-control"
                        id='inputLocation4'
                        name='chapter_location'
                        placeholder="Location of your chapter"
                        aria-label="Location of your chapter"
                        value={values.chapter_location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.chapter_location && touched.chapter_location ? (
                        <p className='errors'>{errors.chapter_location}</p>) : null}
                </div>
                <div className="col-md-4">
                    <label htmlFor="chapterhead" className="form-label">Chapter Head</label>
                    <input
                        type="text"
                        className="form-control"
                        id='chapterhead'
                        name='chapter_head'
                        placeholder="Chapter Head"
                        aria-label="Chapter Head"
                        value={values.chapter_head}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.chapter_head && touched.chapter_head ? (
                        <p className='errors'>{errors.chapter_head}</p>) : null}
                </div>

                <div className="col-md-4">
                    <label htmlFor="ChapterMembers" className="form-label">Chapter Members</label>
                    <input
                        type="number"
                        className="form-control"
                        id='ChapterMembers'
                        name='chapter_members'
                        placeholder="total chapter members"
                        value={values.chapter_members}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.chapter_members && touched.chapter_members ? (
                        <p className='errors'>{errors.chapter_members}</p>) : null}
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        id="inputEmail4"
                        placeholder="Email"
                        aria-label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                        <p className='errors'>{errors.email}</p>) : null}
                </div>
           
                <div className="col-md-4">
                    <label htmlFor="establishedyear" className="form-label">College Established</label>
                    <input
                        type="number"
                        className="form-control"
                        id='establishedyear'
                        name='college_estd'
                        placeholder="College Established Year"
                        value={values.college_estd}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.college_estd && touched.college_estd ? (
                        <p className='errors'>{errors.college_estd}</p>) : null}
                </div>
          
                <div className="col-md-4">
                    <label htmlFor="inputuniversity4" className="form-label">School/College/University Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id='inputuniversity4'
                        name='college_name'
                        placeholder="School/College/University Name"
                        aria-label="School/College/University Name"
                        value={values.college_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.college_name && touched.college_name ? (
                        <p className='errors'>{errors.college_name}</p>) : null}
                </div>

                <div className="col-md-4">
                    <label htmlFor="collegeaddress" className="form-label">College Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id='collegeaddress'
                        name='college_address'
                        placeholder="College Address"
                        aria-label="College Address"
                        value={values.college_address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors. college_address && touched.college_address ? (
                        <p className='errors'>{errors.college_address}</p>) : null}
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputwebsite4" className="form-label">College Website</label>
                    <input
                        type="url"
                        id='inputwebsite4'
                        className="form-control"
                        name='college_website'
                        placeholder="https://SEDS-Nepal.com"
                        value={values.college_website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.college_website && touched.college_website ? (
                        <p className='errors'>{errors.college_website}</p>) : null}
                </div>
                <button className='btn1' type='submit'>Submit</button>
            </form>         
        </div>
    )
}

export default Club
