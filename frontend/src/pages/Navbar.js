import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const navigate=useNavigate();
  const handlesignout=()=>{
  
          localStorage.removeItem('name')
          localStorage.removeItem('email')
          localStorage.removeItem('id')
          localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div className='row border py-2'>
  <div className='col-12 d-flex justify-content-between align-items-center'>
    <div className='text-start'>
      <Link to='/bloglist' className='text-decoration-none'><button className='btn btn-dark'>Blog List</button></Link>
    </div>
    
    <div className='text-center'>
      {localStorage.getItem('name')}
    </div>
    
    <div className='text-end'>
      <Link to='/' className='text-decoration-none' onClick={handlesignout}><button className='btn btn-dark'>Logout</button></Link>
    </div>
  </div>
</div>

  )
}

