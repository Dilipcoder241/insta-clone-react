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
import OtherUserProfile from "./OtherUserProfile";



function App() {
  
  return (
    <>
    <div className="bg-zinc-900">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Feed" element={<Feed/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/edit" element={<Edit/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/user/:id" element={<OtherUserProfile/>}/>
      </Routes>
    </BrowserRouter>
      <ToastContainer theme="dark" position="bottom-center"/>
      </div> 
    </>
  )
}

export default App
