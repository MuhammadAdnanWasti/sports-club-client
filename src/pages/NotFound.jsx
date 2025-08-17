import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
      
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>

   
        <div className="relative z-10">
       
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-green-500 via-amber-300 to-green-500 bg-clip-text text-transparent leading-none">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-900 mx-auto mt-4 rounded-full"></div>
          </div>

       
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">Oops! Page Not Found</h2>
            <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off into the digital void. Don't worry, it happens to
              the best of us.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <Link to="/" className="btn btn-primary mt-6">          Go Back Home        </Link>      

         
          </div>

   
          
        </div>
      </div>
    </div>
  )
}

export default NotFound