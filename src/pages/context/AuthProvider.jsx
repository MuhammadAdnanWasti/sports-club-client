import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase.init'
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
     const [user, setUser]=useState(null)
    const [loading, setLoading]=useState(true)
const updatePro =(profile) => { 
  return updateProfile(auth.currentUser, profile)
 }
 const signIn=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email,password)
}
const googleSignIn =() => { 
  setLoading(true)
return signInWithPopup(auth, googleProvider)
 }
 const  createUser =(email,password)=>{
  setLoading(true)
    return createUserWithEmailAndPassword(auth,email, password )
 }
 const  signOutUser =()=>{
  setLoading(true)
    return signOut(auth)
 }
  useEffect(() => {
   const unSubscribe=onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser)
      setLoading(false)
   })
 
   return () => {
     unSubscribe()
   }
 }, [])
    const userInfo={
 loading,
        user,
        signOutUser,
        updatePro,
        createUser,
     googleSignIn,
     signIn
    }
  return (
    <AuthContext value={userInfo}>
    {children}
   </AuthContext>
  )
}

export default AuthProvider
