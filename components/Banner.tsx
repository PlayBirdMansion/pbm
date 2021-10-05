import React from 'react'
import Image from 'next/image'
import banner from '../public/banner.png'

interface BannerProps {
  image: any
}

export const Banner: React.FC<BannerProps> = ({ image }) => {
  return (
    <div className='top-0 relative z-0'>
      <Image src={image} layout='responsive' />      
    </div>
  )
}