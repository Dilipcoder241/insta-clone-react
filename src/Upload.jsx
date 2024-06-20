import React from 'react';
import PostuploadEdit from '../components/PostuploadEdit';
import Footer from '../components/Footer';


function Upload() {
  return (
    <div className='relative'>
    <PostuploadEdit heading="Upload Post" type="upload"/>
    <Footer/>
    </div>
  )
}

export default Upload
