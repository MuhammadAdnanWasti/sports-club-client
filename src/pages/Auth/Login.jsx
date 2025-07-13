import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const Login = () => {
    const { googleSignIn, signIn}=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
     const axiosInstance=useAxios()
     const handleLogin =(e) => { 
e.preventDefault()
const formData=new FormData(e.target);
  
  
    const {email,password}= Object.fromEntries(formData.entries())
    signIn(email,password)
     .then((result) => {
             Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are successfully loged in",
          showConfirmButton: false,
          timer: 1500
        });
        navigate( location?.state || '/' )
            }).catch((error) => {
               Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your password/email is wrong!",
        
      });
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
//    console.log(result)
                  Swal.fire({
             position: "top-end",
             icon: "success",
             title: "Your account has been created",
             showConfirmButton: false,
             timer: 1500
           });
            navigate( location?.state || '/' )
               }).catch((error) => {
                 
               })
      }
  return (
   <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
   
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleLogin} className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
         
          <button className="btn btn-neutral mt-4">Login</button>
            <p className="text-sm text-primary text-center mt-6">
            Don't have an account?
            <Link to="/auth/register" className="text-purple-600 hover:underline ml-1">Register</Link>
          </p>
        </form>
          <button onClick={handleGoogle} type="button" className="w-full flex items-center justify-center gap-3 btn border border-gray-300 bg-white text-black hover:bg-gray-100">
            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="#EA4335" d="M256 192v128h71c-6 40-38 64-71 64-42 0-80-37-80-96s38-96 80-96c22 0 41 9 55 23l41-41C327 150 294 136 256 136c-66 0-128 54-128 120s62 120 128 120c71 0 122-49 122-120 0-8-1-16-2-24H256z" />
            </svg>
            <span>Continue with Google</span>
          </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Login
