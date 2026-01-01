
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar";
import { Routes,Route} from "react-router-dom";
import LenisScroll from "./components/lenis-scroll";
import Footer from "./components/footer";
import Generate from "./pages/Generate";
import MyGenerations from "./pages/MyGenerations";
import Login  from "./components/login";
import YtPreview from "./pages/YtPreview";




export default function App() {
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
             
        </>
    );
}

