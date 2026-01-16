
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar";
import {useLocation ,Routes,Route} from "react-router-dom";
import LenisScroll from "./components/lenis-scroll";
import Footer from "./components/footer";
import Generate from "./pages/Generate";
import MyGenerations from "./pages/MyGenerations";
import Login  from "./components/login";
import YtPreview from "./pages/YtPreview";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';




export default function App() {
    const {pathname} = useLocation()

     useEffect(()=>{
        window.scrollTo(0,0)
     },[pathname])

    return(
        <>
            
           
           <LenisScroll/>
           <Navbar/>
           <Routes>
            <Route  path='/' element={<HomePage/>}/> 
            <Route path='/generate' element={<Generate/>}/>
            <Route path='/generate/:id' element={<Generate/>}/>
            <Route path='/my-generations' element={<MyGenerations/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/preview' element={<YtPreview/>}/>  
           </Routes>
           <Footer/>
           <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" 
        />
           
             
        </>
    );
}

