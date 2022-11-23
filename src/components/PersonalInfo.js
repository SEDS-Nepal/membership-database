import React from 'react';

function PersonalInfo({formData, setFromData ,setEducation}) {
  function handelClick(event) {
    console.log(event.target.value);
    setEducation(event.target.value);
}
  return (
    <div  className="container ">
      <form className="row g-3">
        <div className="col-md-4">
          <label htmlFor="inputFirstName4" className="form-label">First Name</label>
          <input
           type="text"
           className="form-control" 
           placeholder="First name"
            aria-label="First name"
             value={formData.firstName} 
             onChange={(event) => 
             setFromData({...formData, firstName: event.target.value})} />
        </div>
        <div className="col-md-4">
        <label htmlFor="inputMiddleName4" className="form-label">Middle Name</label>
          <input
           type="text"
           className="form-control" 
            placeholder="middle name" 
            aria-label="middle name" 
            value={formData.middleName} 
            onChange={(event) => 
            setFromData({...formData, middleName: event.target.value})}
            />
        </div>
        <div className="col-md-4">
        <label htmlFor="inputLastName4" className="form-label">Last Name</label>
          <input
           type="text"
            className="form-control"
             placeholder="Last name" 
             aria-label="Last name"
             value={formData.lastName} 
             onChange={(event) => 
             setFromData({...formData, lastName: event.target.value})}
              />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input 
          type="email"
           className="form-control"
            id="inputEmail4"
             placeholder="Email"
             value={formData.email} 
             onChange={(event) => 
             setFromData({...formData, email: event.target.value})} />
        </div>
        <div className="col-md-4">
        <label htmlFor="inputPhoneNumber4" className="form-label">Phone Number</label>
          <input
           type="number" 
           className="form-control"
            placeholder="number"
             aria-label="number" 
             value={formData.number} 
             onChange={(event) => 
             setFromData({...formData, number: event.target.value})}
             />
        </div>
        <div className="col-md-4">
        <label htmlFor="inputPersons_id4" className="form-label">Persons_ID</label>
          <input 
          type="number"
          className="form-control"
            placeholder="citizenship number" 
            value={formData.personsid} 
            onChange={(event) => 
            setFromData({...formData, personsid: event.target.value})}
            />
        </div>
        <div className="col-md-4">
        <label htmlFor="inputcity4" className="form-label">City</label>
          <input 
          type="text" 
          className="form-control" 
          placeholder="city" 
          value={formData.city} 
          onChange={(event) => 
          setFromData({...formData, city: event.target.value})}
          />
        </div>
        <div className="col-md-4">
        <label htmlFor="inputProvince4" className="form-label">Province</label>
          <input
           type="text/number" 
           className="form-control"
            placeholder="province"
            value={formData.province} 
            onChange={(event) => 
            setFromData({...formData, province: event.target.value})}
             />
        </div>
        <div className="col-md-4">
        <label htmlFor="inputPostal_code4" className="form-label">Postal Code</label>
          <input
           type="number" 
           className="form-control" 
           placeholder="Postal code"
           value={formData.postalcode} 
           onChange={(event) => 
           setFromData({...formData, postalcode: event.target.value})}
            />
        </div>
      
        <div className="col-md-12">
          <label htmlFor="form-select" className="form-label">Education(Choose the recent one)</label>
          <select 
          id="inputState" 
          className="form-select"
          value={formData.education}
          onChange={(event) =>
            setFromData({ ...formData, education: event.target.value })
            }
            onClick={(e)=>(handelClick(e))}
          >
          <option value="master"> Masters</option>
          <option value="bachlor">Bachlor/Diploma</option>
          <option value="highschool">HighSchool(+2)</option>
          <option value="school">School</option>   
          </select>
        </div>    
     </form>
    </div>
  )
}

export default PersonalInfo;
