import React from 'react'


function Job({ formData, setFromData }) {
  return (
    <div className="container ">
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputCompanyName4" className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Company name"
            aria-label="Company name"
            value={formData.companyName}
            onChange={(event) =>
              setFromData({ ...formData, companyName: event.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCompanyAdress4" className="form-label">Company Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Company Address"
            aria-label="Company Address"
            value={formData.companyAddress}
            onChange={(event) =>
              setFromData({ ...formData, companyAddress: event.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPosition4" className="form-label">Position </label>
          <input
            type="text"
            className="form-control"
            placeholder="Position "
            aria-label="Position "
            value={formData.position}
            onChange={(event) =>
              setFromData({ ...formData, position: event.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputLinkedinid4" className="form-label">Linkedin ID</label>
          <input
            type="text"
            className="form-control"
            id="Linkedin ID"
            placeholder="Linkedin ID"
            value={formData.linkedinId}
            onChange={(event) =>
              setFromData({ ...formData, linkedinId: event.target.value })}
          />
        </div>

      </form>
    </div>
  )
}

export default Job
