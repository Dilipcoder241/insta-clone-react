import React from 'react';
import PostuploadEdit from '../components/PostuploadEdit';
import Footer from '../components/Footer';


function Upload() {
  return (
    <div className='relative md:flex'>
    <Footer/>
    <PostuploadEdit heading="Upload Post" type="upload"/>
    </div>
  )
}

export default Upload
