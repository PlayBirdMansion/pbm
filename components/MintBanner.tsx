import { LinkOut } from 'akar-icons'
import React from 'react'
import { MintButton } from './MintButton'

interface MintBannerProps {

}

export const MintBanner: React.FC<MintBannerProps> = ({ }) => {
  return (
    <div className='flex flex-col sm:flex-row w-full mt-12 p-6 items-center bg-gradient-to-br to-[#0CF2FF] from-[#F709FF] text-white'>
      <div className='flex p-3 sm:w-1/3 justify-center'>
        <div className=' font-bold text-[2rem] items-center text-center'>
          Join The Party!
          <div className='font-medium text-[1.2rem] text-center items-center'>
            Come party with us on the Polygon Blockchain!
          </div>
        </div>
      </div>
      <div className='flex p-3 sm:w-1/3 justify-center'>
        <div className=' font-bold text-[2rem] items-center text-center'>
          10 MATIC
          <div className='font-normal text-[1.2rem] text-center items-center'>
            Use a Referral Address from a current Play Bird holder for a 1 MATIC discount!
          </div>
          <div className='font-normal text-[.88rem] text-center items-center underline'>
            Referral Contest details below.
          </div>
        </div>
      </div>
      <div className='flex py-3 px-0 sm:w-1/3 items-center justify-center flex-col'>
        <MintButton title={'MINT NOW'} style={'text-white border-2 border-white hover:shadow hover:bg-white hover:bg-opacity-10 rounded-xl px-2  font-bold text-[2rem] items-center text-center'} />
        <a href={'https://polygonscan.com/address/0x2ce684d4ba8e47c12f5dbb474241968dc800b7ca'} target='_blank' rel="noreferrer" className='mt-2 text-white hover:text-opacity-75'>
          <div className='flex flex-row pt-2 items-center'>
            <div className='pr-2'>Contract</div><LinkOut size='18' />
          </div>
        </a>
      </div>
    </div>
  )
}
