'use client'

import React from 'react';
import PostuploadEdit from '../(componente)/PostuploadEdit';
import Footer from '../(componente)/Footer';


function page() {
  return (
    <div className='relative'>
    <PostuploadEdit heading="Upload Post" type="upload"/>
    <Footer/>
    </div>
  )
}

export default page
