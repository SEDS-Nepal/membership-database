import React from 'react'
function Update({page, setPage}) {
    return (
      <div class="container ">
        <div class="col-md-12 text-center">
            <h2>Form Submitted Successfully.</h2>
            <button className='update'   onClick={() => setPage(0) }>Update</button>
        </div>
    </div>
  
    )
  }
export default Update
