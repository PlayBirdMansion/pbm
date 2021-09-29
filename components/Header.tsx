import { useState } from 'react'
import React from 'react'
// import { ConnectButton } from './ConnectButton'
import { Logo } from './Logo'
import { Menu } from './Menu'
import { MintButton } from './MintButton'

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
  const [bg, setBg] = useState(false);

  const updateBg = () => {
    if (window.scrollY >= 50) {
      setBg(true);
    } else {
      setBg(false);
    }
  }
  window.addEventListener('scroll', updateBg);

  return (
    <div className={bg ? 'bg-black bg-opacity-75' : 'bg-transparent'}>
    <header className='overflow-x-hidden sticky top-0 z-40 flex flex-row flex-grow justify-between px-8 py-4 align-middle items-center'>
      <Logo />
      <div className=''><Menu /></div>
      <MintButton title={'🎉 MINT'} style={'font-medium border-2 border-gray-100 hover:border-white hover:bg-white hover:bg-opacity-10 text-[1.5rem] rounded-xl shadow-md px-3 py-1 text-gray-100 hover:text-white'} />
    </header>
    </div>
  )
}