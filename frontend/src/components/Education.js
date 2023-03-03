import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Hidden } from '@mui/material';
let edu;
function School({ formData, setFromData }) {
  return (
    <>
        <div className="col-md-6">
          <label htmlFor="inputSchoolName4" className="form-label">School Name</label>
          <input
            type="text"
            className="form-control"
            id='inputSchoolName4'
            placeholder="School name"
            aria-label="School name"
            value={formData.school_name}
            onChange={(event) =>
              setFromData({ ...formData, school_name: event.target.value })}
    
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputSchoolAdress4" className="form-label">School Address</label>
          <input
            type="text"
            className="form-control"
            id='inputSchoolAdress4'
            placeholder="School Address"
            aria-label="School Address"
            value={formData.school_address}
            onChange={(event) =>
              setFromData({ ...formData, school_address: event.target.value })}
         
          />
        </div>
        
        {/* <div className="col-md-6">
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
        </div> */}

        <div className="col-md-12">
          <label htmlFor="inputWebsite4" className="form-label">Website</label>
          <input
            type="url"
            className="form-control"
            id='inputWebsite4'
            placeholder="abc.com"
            value={formData.school_website}
            onChange={(event) =>
              setFromData({ ...formData, school_website: event.target.value })}
          
          />
        </div> 
        </>
  )
}


function College({ formData, setFromData  }) {
  const [college, setCollege] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const handleFilter = (event) => {
     setSearchWord(event.target.value);
    const newFilter = college.filter((value) => {
      return value.college_name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setfilteredData([]);
    }else{
      setfilteredData(newFilter);
    }
    setFromData({ ...formData, college_name: event.target.value })
  };

  const onSearch = (searchTerm) => {
    setSearchWord(searchTerm);
    console.log('search' , searchTerm);
    setFromData({ ...formData, college_name: searchTerm })
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/colleges/")
        .then(response => {
          setCollege(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}, []);
  return (
    <> 
    <div className="col-md-6">
      <label htmlFor="inputCollegeName4" className="form-label">College Name</label>
      <input
        type="text"
        className="form-control"
        id='inputCollegeName4'
        placeholder="College name"
        aria-label="College name"
        value={formData.college_name}
        onChange={handleFilter}
      />
        
          {filteredData.length != 0  &&(
    <div className='dataResult'>
    {filteredData.map(item => (
                        <div className='dataItem '>
                            <p onClick={()=> onSearch(item.college_name)}>{item.college_name}</p>
                           
                        </div>
                    ))}
    </div>
    )}
    </div>

    <div className="col-md-6">
      <label htmlFor="inputCollegeAdress4" className="form-label">College Address</label>
      <input
        type="text"
        className="form-control"
        id='inputCollegeAdress4'
        placeholder="College Address"
        aria-label="College Address"
        value={formData.college_address}
        onChange={(event) =>
          setFromData({ ...formData, college_address: event.target.value })}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="inputMajor4" className="form-label">Major </label>
      <input
        type="text"
        className="form-control"
        id='inputMajor4'
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
        id="inputYear4"
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
        id='inputWebsite4'
        placeholder="abc.com"
        value={formData.college_website}
        onChange={(event) =>
          setFromData({ ...formData, college_website: event.target.value })}
      />
    </div> 
    </>
  )
}

function Education({ formData, setFromData , education }) {
  if (education === "school") {
    edu = <School formData={formData} setFromData={setFromData}/>
  } 
    
 else
 {edu = <College formData={formData} setFromData={setFromData}/>}
  
  return(
    
    <div className="container ">
    <form className="row g-3">
     {edu}
    <div className="col-md-12">
    <label htmlFor ="form-select4" className="form-label">Are you working</label>
    <select 
    id="form-select4" 
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
);
}

export default Education;
