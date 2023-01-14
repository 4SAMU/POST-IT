import React from 'react'
import "./styles.css"

const Landing = () => {
  return (
    <div className='landing'>
    <div className='body'>
        <div className='top'>
            <h1 className='title1'>POST-IT</h1><button className='btn'>connect wallet</button>
        </div>
        <div className='text'>
            
                <div className='p'>
                    Welcome to POST-IT, a revolutionary new social platform built on the power of Web3 technology. 
                </div> 
                <div className='p'> 
                    On POST-IT, you can share your thoughts, ideas, and experiences with the world. Create a profile, make new friends, and discover a new level of freedom in social networking.
                </div> 
                <div className='p'>
                    Join us today and be a part of the future of social media. Welcome to POST-IT!
                </div>
            
        </div>
        <div className='group'>
        </div>
        <div>
            <button className='btn exp'>Explore Now</button>
        </div>        
    </div>
   
    </div>
  )
}

export default Landing