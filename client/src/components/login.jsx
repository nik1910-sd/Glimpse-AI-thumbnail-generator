import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => { 
    const [state, setState] = useState("login");
    const { user, login, signUp } = useAuth(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state === 'login') {
            await login({ email: formData.email, password: formData.password });
        } else {
            await signUp(formData);
        }
    };

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    return (
        <>

        <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
       
    <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#D10A8A]/40 blur-[120px]" />
    <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2E08CF]/40 blur-[120px]" />
    <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#F26A06]/40 blur-[120px]" />
    </div>

        <div className=' flex items-center justify-center'>
            <form onSubmit={handleSubmit} className="w-full sm:w-[400px] text-center bg-white/5 border border-white/10 rounded-2xl p-8">
                <h1 className="text-white text-3xl font-medium">{state === "login" ? "Login" : "Sign Up"}</h1>
                <p className="text-gray-400 text-sm mt-2 mb-6">Enter your details to continue</p>

                {state !== "login" && (
                    <input type="text" name="name" placeholder="Full Name" required className="w-full bg-white/5 text-white p-3 rounded-xl mb-4 border border-white/10 focus:ring-1 focus:ring-orange-500 outline-none" value={formData.name} onChange={handleChange} />
                )}
                <input type="email" name="email" placeholder="Email Address" required className="w-full bg-white/5 text-white p-3 rounded-xl mb-4 border border-white/10 focus:ring-1 focus:ring-orange-500 outline-none" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required className="w-full bg-white/5 text-white p-3 rounded-xl mb-6 border border-white/10 focus:ring-1 focus:ring-orange-500 outline-none" value={formData.password} onChange={handleChange} />

                <button type="submit" className="w-full py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition">
                    {state === "login" ? "Login" : "Create Account"}
                </button>

                <p onClick={() => setState(state === "login" ? "signup" : "login")} className="text-gray-400 mt-6 cursor-pointer hover:text-white transition">
                    {state === "login" ? "Don't have an account? " : "Already have an account? "}
                    <span className="text-orange-500">Click here</span>
                </p>
            </form>
        </div>
        </>
    );
};

export default Login;