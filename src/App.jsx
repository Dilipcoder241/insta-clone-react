import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Feed from "./Feed";
import Profile from "./Profile";
import Search from "./Search";
import Edit from "./Edit";
import Upload from "./Upload";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Feed" element={<Feed/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/edit" element={<Edit/>}/>
        <Route path="/upload" element={<Upload/>}/>
      </Routes>
    </BrowserRouter>
      <ToastContainer theme="dark" position="bottom-center"/>
    </>
  )
}

export default App
