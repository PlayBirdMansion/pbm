import React from 'react'
import Image from 'next/image'
import { FooterItem } from './FooterItem'
import { TwitterFill, DiscordFill, LinkOut } from 'akar-icons'
import OpenseaFill from '../public/opensea_logo.png'

interface FooterProps {

}

export const Footer: React.FC<FooterProps> = ({ }) => {
  return (
    <footer className='text-white flex flex-col items-center justify-center text-f1 pb-3 font-light mt-24'>
      <div className='flex flex-row'>
        <a href={'https://twitter.com/PlayBirdMansion'} target='_blank' rel="noreferrer">
          <TwitterFill size='30' />
        </a>
        <div className='py-4 px-2' />
        <a href={'https://discord.gg/hujxVvKmD4'} target='_blank' rel="noreferrer">
          <DiscordFill size='30' />
        </a>
        <div className='py-4 px-2' />
        <a href={'https://opensea.io/collection/playbirdmansion'} target='_blank' rel="noreferrer">
          <Image width='28' height='28' src={OpenseaFill} />
        </a>
        
      </div>
      <a href={'https://polygonscan.com/address/0x2ce684d4ba8e47c12f5dbb474241968dc800b7ca'} target='_blank' rel="noreferrer" className='mt-2 text-white hover:text-opacity-75'>
          <div className='flex flex-row items-center pb-1'>
            <div className='pr-2 text-[.9rem]'>Contract</div><LinkOut size='12' />
          </div>
        </a>
      <FooterItem name='Play Bird Mansion | All Rights Reserved' href='' />
    </footer>
  )
}