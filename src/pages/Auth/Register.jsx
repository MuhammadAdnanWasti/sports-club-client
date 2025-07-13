import React, {  useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth'
import useAxios from '../hooks/useAxios'

const Register = () => {
  const {googleSignIn,createUser,updatePro}=useAuth()
  const [errMessage, setErrMessage] = useState('');
  const axiosInstance=useAxios()
    const navigate=useNavigate()
    const location=useLocation()
  const handleRegister=(e) => { 
    e.preventDefault()
    const formData=new FormData(e.target);
  
  
    const {email,password,photo,name}= Object.fromEntries(formData.entries())

     setErrMessage('')
     
const passRange = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
if (passRange.test(password)===false) {
  setErrMessage("Your password mush include one small letter,one capital letter and minimun 6 character")
  return
}
    createUser(email,password)
     .then(async(result) => {
        
        const userInfo={
  displayName:name,
  photoURL:photo,        
  email:email,
  role:'user',
  created_at:new Date().toISOString()
}
const userRes= await axiosInstance.post('/users', userInfo)

      const profile={
            displayName:name,
            photoURL: photo,
            email:email

      }
      updatePro(profile)
        .then(()=>{

          }).catch((error)=>{
            // console.log(error)
          })
                Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your account has been created",
          showConfirmButton: false,
          timer: 1500
        });
         navigate( location?.state || '/' )
            }).catch((error) => {
               setErrMessage(error.message)
            })
  }

   const handleGoogle= () => { 
googleSignIn()
 .then(async(result) => {

const userInfo={
  displayName:result.user.displayName,
  photoURL:result.user.photoURL,        
  email:result.user.email,
  role:'user',
  created_at:new Date().toISOString()
}
const userRes= await axiosInstance.post('/users', userInfo)
// console.log(result)
               Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your account has been created",
          showConfirmButton: false,
          timer: 1500
        });
         navigate( location?.state || '/' )
            }).catch((error) => {
              console.log(error)
            })
   }
  return (
   <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
   
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl font-bold">Register now!</h1>
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label">Name</label>
          <input type="text" name='name' className="input" placeholder="Name" />
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">PhotoURL</label>
          <input type="url" name='photo' className="input" placeholder="PhotoURL" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
         
          <button className="btn btn-neutral mt-4">Register</button>
            <p className="text-sm text-primary text-center mt-6">
            Already have an account?
            <Link to="/auth/login" className="text-purple-600 hover:underline ml-1">Login</Link>
          </p>
        </form>
         <button onClick={handleGoogle} type="button" className="w-full flex items-center justify-center gap-3 btn border border-gray-300 bg-white text-black hover:bg-gray-100">
            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="#EA4335" d="M256 192v128h71c-6 40-38 64-71 64-42 0-80-37-80-96s38-96 80-96c22 0 41 9 55 23l41-41C327 150 294 136 256 136c-66 0-128 54-128 120s62 120 128 120c71 0 122-49 122-120 0-8-1-16-2-24H256z" />
            </svg>
            <span>Continue with Google</span>
          </button>
              {
                errMessage && <p  className='text-red-500'>
                  {errMessage}
                </p>
              }
      </div>
    </div>
  </div>
</div>
  )
}

export default Register
