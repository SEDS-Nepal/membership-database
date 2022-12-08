import React, { useState } from 'react'
import { Formik, useFormik } from 'formik';
import { newChapterSchema } from '../Validations/NewChapterValidation';
import Clubstepper from './stepper/Clubstepper';
import Success from './Success';
const initialValues = {
    email: "",
    chaptername: "",
    chapterlocation: "",
    facebookpage: "",
    twitter: "",
    establishedyear: "",
    institutionname: "",
    website: "",
}
function ClubForm({ values, errors, handleBlur, touched, handleChange}) {
    return (
        <div className='container'>
            <div className="row g-3">
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
                    <label htmlFor="inputchaptername4" className="form-label">Your Chapter Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id='inputchaptername4'
                        name='chaptername'
                        placeholder="Your Chapter Name"
                        aria-label="Your Chapter Name"
                        value={values.chaptername}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.chaptername && touched.chaptername ? (
                        <p className='errors'>{errors.chaptername}</p>) : null}
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputLocation4" className="form-label">Location of your chapter</label>
                    <input
                        type="text"
                        className="form-control"
                        id='inputLocation4'
                        name='chapterlocation'
                        placeholder="Location of your chapter"
                        aria-label="Location of your chapter"
                        value={values.chapterlocation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.chapterlocation && touched.chapterlocation ? (
                        <p className='errors'>{errors.chapterlocation}</p>) : null}
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputfacebookpage4" className="form-label">Facebook Page</label>
                    <input
                        type="text"
                        className="form-control"
                        id='inputfacebookpage4'
                        name='facebookpage'
                        placeholder="Facebook Page"
                        value={values.facebookpage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.facebookpage && touched.facebookpage ? (
                        <p className='errors'>{errors.facebookpage}</p>) : null}
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputtwitter4" className="form-label">Twitter</label>
                    <input
                        type="text"
                        className="form-control"
                        id='inputtwitter4'
                        name='twitter'
                        placeholder="twitter"
                        value={values.twitter}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.twitter && touched.twitter ? (
                        <p className='errors'>{errors.twitter}</p>) : null}
                </div>
                <div className="col-md-4">
                    <label htmlFor="establishedyear" className="form-label">Year Established</label>
                    <input
                        type="number"
                        className="form-control"
                        id='establishedyear'
                        name='establishedyear'
                        placeholder="Year Established"
                        value={values.establishedyear}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.establishedyear && touched.establishedyear ? (
                        <p className='errors'>{errors.establishedyear}</p>) : null}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputuniversity4" className="form-label">School/College/University Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id='inputuniversity4'
                        name='institutionname'
                        placeholder="School/College/University Name"
                        aria-label="School/College/University Name"
                        value={values.institutionname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.institutionname && touched.institutionname ? (
                        <p className='errors'>{errors.institutionname}</p>) : null}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputwebsite4" className="form-label">Website</label>
                    <input
                        type="url"
                        id='inputwebsite4'
                        className="form-control"
                        name='website'
                        placeholder="website"
                        value={values.website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.website && touched.website ? (
                        <p className='errors'>{errors.website}</p>) : null}
                </div>
            </div>         
        </div>
    )
}

function QuesAns() {
    return (
        <div className='container'>
            <div className="row g-3">
                <div className="mb-3">
                    <label htmlFor="FormControlTextarea1" className="form-label">If you already have a faculty member from your college/University helping you out, what's their name? If you don't have it now, you can update us again when the information changes.</label>
                    <textarea
                        className="form-control"
                        id="FormControlTextarea1"
                        rows="3"
                    // value={formData.ques1}
                    // onChange={(event) =>
                    //   setFromData({ ...formData, ques1: event.target.value })}
                    >

                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="FormControlTextarea2" className="form-label">Why do you want to start a SEDS Chapter?
                    </label>
                    <textarea
                        className="form-control"
                        id="FormControlTextarea2"
                        rows="3"
                    //   value={formData.ques2}
                    //   onChange={(event) =>
                    //     setFromData({ ...formData, ques2: event.target.value })}
                    >
                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="FormControlTextarea3" className="form-label">Who is the President of your organization? (Or main point of contact for us)
                    </label>
                    <textarea
                        className="form-control"
                        id="FormControlTextarea3"
                        rows="3"
                    // value={formData.ques1}
                    // onChange={(event) =>
                    //   setFromData({ ...formData, ques1: event.target.value })}
                    >

                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="FormControlTextarea4" className="form-label">How many members do you have as of now? Please send the members list to chapters at sedsnepal dot org</label>
                    <textarea
                        className="form-control"
                        id="FormControlTextarea4"
                        rows="3"
                    //   value={formData.ques2}
                    //   onChange={(event) =>
                    //     setFromData({ ...formData, ques2: event.target.value })}
                    >
                    </textarea>
                </div>
                <label htmlFor="FormControlTextarea5" className="form-label">Do you understand and agree by the rules and bylaws of SEDS-Nepal organization?</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Yes
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        No

                    </label>
                </div>
            </div>
        </div>
    )
}


function Club() {

    const { values, errors, handleBlur, touched, handleChange, handleSubmit , isValid} = useFormik({
        initialValues: initialValues,
        validationSchema: newChapterSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    })
    console.log(isValid);
    const [page, setPage] = useState(0);
    const PageDisplay = () => {
        if (page === 0) {
            return <ClubForm values={values} errors={errors} handleBlur={handleBlur} touched={touched} handleChange={handleChange}/>
        }
        else if (page === 1) {
            return <QuesAns />
        }
        else {
            return <Success />
        }
    }
    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='header'>
                <Clubstepper page={page} />
            </div>
            <div className='form-container'>
                <div className='formbody'>{PageDisplay()}
                    <div className='Footer'>
                        <button className='prev'
                            disabled={page === 0}
                            hidden={page === 2}
                            onClick={() => {
                                setPage((currPage) => currPage - 1);
                            }}>
                            Prev </button>

                        <button className='next input-button' type='submit'
                        disabled={!isValid}
                            hidden={page === 2}
                            onClick={() => {    
                                    setPage((currPage) => currPage + 1);
                            }}>
                            {page === 1 ? "Submit" : page === 0 ? "Next" : ""} </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Club
