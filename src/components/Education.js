import React from 'react'

function School({ formData, setFromData }) {
  return (
    <div className="container ">
    <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputSchoolName4" className="form-label">School Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="School name"
            aria-label="School name"
            value={formData.schoolName}
            onChange={(event) =>
              setFromData({ ...formData, schoolName: event.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputSchoolAdress4" className="form-label">School Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="School Address"
            aria-label="School Address"
            value={formData.schoolAddress}
            onChange={(event) =>
              setFromData({ ...formData, schoolAddress: event.target.value })}
          />
        </div>
        
        <div className="col-md-6">
          <label htmlFor="inputClass4" className="form-label">Class</label>
          <input
            type="number"
            className="form-control"
            id="class"
            placeholder="class"
            value={formData.class}
            onChange={(event) =>
              setFromData({ ...formData, class: event.target.value })}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputWebsite4" className="form-label">Website</label>
          <input
            type="url"
            className="form-control"
            placeholder="abc.com"
            value={formData.schoolWebsite}
            onChange={(event) =>
              setFromData({ ...formData, schoolWebsite: event.target.value })}
          />
        </div>
        <div className="col-md-12">
      <label htmlFor ="form-select" className="form-label">Are you working</label>
      <select 
      id="inputState" 
      className="form-select"
      value={formData.job}
      onChange={(event) =>
        setFromData({ ...formData, job: event.target.value })}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="intern">As an Intern</option>
      </select>
    </div>
        </form>
    </div>
  
  )
}


function College({ formData, setFromData }) {
  return (
    <div className="container ">
      <form className="row g-3">    
    <div className="col-md-6">
      <label htmlFor="inputCollegeName4" className="form-label">College Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="College name"
        aria-label="College name"
        value={formData.collegeName}
        onChange={(event) =>
          setFromData({ ...formData, collegeName: event.target.value })}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="inputCollegeAdress4" className="form-label">College Address</label>
      <input
        type="text"
        className="form-control"
        placeholder="College Address"
        aria-label="College Address"
        value={formData.collegeAddress}
        onChange={(event) =>
          setFromData({ ...formData, collegeAddress: event.target.value })}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="inputMajor4" className="form-label">Major </label>
      <input
        type="text"
        className="form-control"
        placeholder="Major "
        aria-label="Major "
        value={formData.major}
        onChange={(event) =>
          setFromData({ ...formData, major: event.target.value })}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="inputYear4" className="form-label">Year</label>
      <input
        type="number"
        className="form-control"
        id="year"
        placeholder="Year"
        value={formData.year}
        onChange={(event) =>
          setFromData({ ...formData, year: event.target.value })}
      />
    </div>

    <div className="col-md-12">
      <label htmlFor="inputWebsite4" className="form-label">Website</label>
      <input
        type="url"
        className="form-control"
        placeholder="abc.com"
        value={formData.collegeWebsite}
        onChange={(event) =>
          setFromData({ ...formData, collegeWebsite: event.target.value })}
      />
    </div>
    <div className="col-md-12">
      <label htmlFor ="form-select" className="form-label">Are you working</label>
      <select 
      id="inputState" 
      className="form-select"
      value={formData.job}
      onChange={(event) =>
        setFromData({ ...formData, job: event.target.value })}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="intern">As an Intern</option>
      </select>
    </div>
    </form>
    </div>
  )
}

function Education({ formData, setFromData , education }) {
  if (education==="school") {
    return <School formData={formData} setFromData={setFromData}/>
  } 
    
 else
 {return <College formData={formData} setFromData={setFromData}/>}
  
}

export default Education
