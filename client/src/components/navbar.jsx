 import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { NavLink, useNavigate, Link } from "react-router-dom"; // Added Link
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuth(); // Values from AuthContext
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav 
                className={`sticky top-0 z-50 flex w-full items-center justify-between px-4 py-3.5 md:px-16 lg:px-24 transition-colors ${isScrolled ? 'bg-white/15 backdrop-blur-lg' : ''}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 70 }}
            >
                <NavLink to='/'>
                    <img src="../assets/logo.svg" alt="logo" className='h-8 w-auto' />
                </NavLink>

                {/* Desktop Navigation */}
                <div className='hidden items-center space-x-10 md:flex'>
                    <NavLink to='/' className='transition hover:text-gray-300'>Home</NavLink>
                    <NavLink to='/generate' className='transition hover:text-gray-300'>Generate</NavLink>
                    
                    {isLoggedIn ? (
                        <NavLink to='/my-generations' className='transition hover:text-gray-300'>My Generations</NavLink>
                    ) : (
                        <NavLink to='#' className='transition hover:text-gray-300'>About</NavLink> 
                    )}
                    
                    <NavLink to='#' className='transition hover:text-gray-300'>Contact</NavLink>
                    
                    <div className="flex items-center gap-2">
                        {isLoggedIn ? (
                            <div className="relative group">
                                <button className="rounded-full size-8 bg-white/20 border-2 border-white/10 flex items-center justify-center">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </button>                                                                                                                 
                                <div className="absolute hidden group-hover:block top-full right-0 pt-2">
                                    <button 
                                        onClick={() => logout()} // Calls logout logic from context
                                        className="btn glass whitespace-nowrap"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="btn glass">
                                Get Started
                            </button>
                        )}
                       
                    </div>
                    
                </div>

                {/* Mobile Menu Toggle */}
                 <button onClick={() => setIsOpen(true)} className='transition active:scale-90 md:hidden'>
                    <MenuIcon className='size-6' />
                </button>
                
            </motion.nav>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/90 text-lg font-medium backdrop-blur-2xl transition duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                <NavLink to='/' onClick={() => setIsOpen(false)}>Home</NavLink>
                <NavLink to='/generate' onClick={() => setIsOpen(false)}>Generate</NavLink>
                
                {isLoggedIn ? (
                    <>
                        <NavLink to='/my-generations' onClick={() => setIsOpen(false)}>My Generations</NavLink>
                        <button 
                            onClick={() => { setIsOpen(false); logout(); }} // Combined logout with menu close
                            className="text-red-400"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to='#' onClick={() => setIsOpen(false)}>About</NavLink>
                        <Link to='/login' onClick={() => setIsOpen(false)}>Login</Link>
                    </>
                )}
                
                <NavLink to='#' onClick={() => setIsOpen(false)}>Contact Us</NavLink>

                <button onClick={() => setIsOpen(false)} className='mt-4 rounded-md p-2 glass'>
                    <XIcon className="size-6" />
                </button>
            </div >
        </>
    );
}