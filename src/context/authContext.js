

"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth'
import { auth } from '@/lib/firebase'



const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}



export const AuthProvider = ({children})=>{

const [user,setUser] = useState(null);
const [loading, setLoading] = useState(true)
const [token, setToken] = useState(null);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)

      if (user) {
        try {
          const token = await user.getIdToken()
          setToken(token)
        } catch (error) {
          console.error('Error getting token:', error)
          setToken(null)
        }
      } else {
        setToken(null)
      }
    })

    return unsubscribe
  }, [])




  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      return result.user
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const logOut = async ()=>{
      try {
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
  }

  const value = {
    user,signInWithGoogle,logOut,loading,token
  }

  return(
      <AuthContext.Provider value={value}>
          {children}
      </AuthContext.Provider>
  )

}