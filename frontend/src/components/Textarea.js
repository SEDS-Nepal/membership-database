import React from 'react'

function Textarea({formData, setFromData}) {
  return (

    <div  className="container  ">
      <form className="row g-3">
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Why do you love Space?</label>
        <textarea 
        className="form-control"
        id="exampleFormControlTextarea1" 
        rows="3"
        value={formData.ques1}
        onChange={(event) =>
          setFromData({ ...formData, ques1: event.target.value })}
        >

        </textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">How do you want to support SEDS-Nepal or the Nepalese Space Community?</label>
        <textarea 
        className="form-control"
         id="exampleFormControlTextarea1"
          rows="3"
          value={formData.ques2}
          onChange={(event) =>
            setFromData({ ...formData, ques2: event.target.value })}
          >
          </textarea>
      </div>
        </form>
    </div>

  )
}

export default Textarea;
