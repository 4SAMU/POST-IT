import React from 'react'

const First = () => {
  return (
    <div className='firstpage'>
        <div className='top top2'>
            <h1 className='title2'>Good Morning, user</h1><p className='date'>12 Jan 14:52:06</p>
        </div>
        <div className='fdiv'>
            <p>Connect to the world, get updates, share whats happening</p>
            <button className='btn crt'>Create Profile</button>
        </div>
        <div>
            <div className='p p2 l'>Seems u dont have an account, create one now!</div>
            <div className='p p2 l2'>Create Profile</div>
            <div className='p p2 l3'>Upload Photo</div>
        </div>
        <div className='photo'></div>
        <div className='p2'>Add Name</div>
        <div className='photo entry'></div>
        <div className='p2'>Add Bio</div>
        <div className='photo entry'></div>

        <button className='btn crt1'>Create now</button>
        
    </div>
  )
}

export default First