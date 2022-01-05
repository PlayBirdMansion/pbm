import React from 'react'
import Image from 'next/image'
import andrew from '../public/team/bird_andrew.png'
import allan from '../public/team/bird_allan.png'
import nojus from '../public/team/bird_nojus.png'

interface TeamProps {

}

export const Team: React.FC<TeamProps> = ({ }) => {
  return (
    <div className='items-center mt-12'>
      <div className='text-center text-transparent bg-clip-text animate-gradient-x bg-gradient-to-r to-[#0CF2FF] from-[#F709FF] font-extrabold text-[3rem] px-8 pt-12'>
        Team
      </div>
      <div className='flex flex-col sm:flex-row w-full mt-4 mb-8 items-center'>
        <div className='justify-center flex px-3 py-4 sm:py-0 sm:w-1/3'>
          <div className=' font-bold text-[2rem] items-center text-center'>
            <a href='https://twitter.com/PlayBirdMansion' target='_blank' rel="noreferrer"><Image src={andrew} width='222' height='222' className='rounded-3xl' /></a>
            <div className='font-medium text-[1.2rem] text-center items-center text-white'>
              Andrew
            </div>
            <div className='font-light text-[1rem] text-center items-center text-white'>
              Artist
            </div>
          </div>
        </div>
        <div className='justify-center flex px-3 py-4 sm:py-0 sm:w-1/3'>
          <div className=' font-bold text-[2rem] items-center text-center'>
            <a href='https://twitter.com/PBMSecurity' target='_blank' rel="noreferrer"><Image src={allan} width='222' height='222' className='rounded-3xl' /></a>
            <div className='font-medium text-[1.2rem] text-center items-center text-white'>
            Allan
            </div>
            <div className='font-light text-[1rem] text-center items-center text-white'>
            Developer
            </div>
          </div>
        </div>
        <div className='justify-center flex px-3 py-4 sm:py-0 sm:w-1/3'>
          <div className=' font-bold text-[2rem] items-center text-center'>
            <a href='https://twitter.com/0xuint' target='_blank' rel="noreferrer"><Image src={nojus} width='222' height='222' className='rounded-3xl' /></a>
            <div className='font-medium text-[1.2rem] text-center items-center text-white'>
            Nojus
            </div>
            <div className='font-light text-[1rem] text-center items-center text-white'>
            Developer
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}