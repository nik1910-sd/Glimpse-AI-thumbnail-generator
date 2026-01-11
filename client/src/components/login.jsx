import React from 'react'
import { useState } from 'react'

const login = () => {

  const [state, setState] = useState("login")

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }
  return (
    <>
    <div className='min-h-screen flex items-center justify-center'>         <form
    onSubmit={handleSubmit}
    className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8">
    <h1 className="text-white text-3xl mt-10 font-medium">
        {state === "login" ? "Login" : "Sign up"}
    </h1>

    <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

    
    {state !== "login" && (
        <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-[rgb(246,89,22)]/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" /> </svg>
            <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none autofill:shadow-[0_0_0_1000px_#1E1C1C_inset] 
             autofill:[-webkit-text-fill-color:white]" value={formData.name} onChange={handleChange} required />
        </div>
    )}

    
    <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-[rgb(246,89,22)]/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>
        <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none " value={formData.email} onChange={handleChange} required />
    </div>

   
    <div className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-[rgb(246,89,22)]/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>
        <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none" value={formData.password} onChange={handleChange} required />
    </div>

    <div className="mt-4 text-left">
        <button className="text-sm text-[rgb(246,89,22)] hover:underline">
            Forget password?
        </button>
    </div>

    
    <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-[rgb(246,89,22)] hover:bg-[rgb(214,76,18)] transition shadow-lg shadow-orange-500/20" >
        {state === "login" ? "Login" : "Sign up"}
    </button>

    <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
        {state === "login" ? "Don't have an account?" : "Already have an account?"}
        <span className="text-[rgb(246,89,22)] hover:underline ml-1">click here</span>
    </p>
</form>
</div>     
    <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
    <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#D10A8A]/40 blur-[120px]" />
    <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2E08CF]/40 blur-[120px]" />
    <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#F26A06]/40 blur-[120px]" />
</div>
        </>
  )
}

export default login