import React, { useEffect, useRef } from 'react'
import { MintApp } from './MintApp';

interface MintModalProps {
  setOpenModal
}

export const MintModal: React.FC<MintModalProps> = ({ setOpenModal }) => {
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if ((ref.current && !ref.current.contains(event.target))) {
          setOpenModal(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className='text-white z-50 fixed left-0 top-0 modal-bg w-full h-screen bg-transparent flex justify-center items-center'>
      <div ref={wrapperRef} className='relative modal-container rounded-2xl bg-[#2B2B2B] shadow-2xl flex flex-col p-5'>
        <div className='modal-close flex flex-grow justify-between'>
        <div className='pb-2 modal-title text-center text-[1.5rem] font-semibold'>
            Mint a Bird 🎉
        </div>
          <button className='text-[#949494] hover:text-[#bebebe] rounded-lg hover:bg-white hover:bg-opacity-10 px-2 bg-transparent cursor-pointer text-[25px]' onClick={() => {
            setOpenModal(false);
          }}>
            X
          </button>
        </div>
        <div className='modal-body flex justify-center items-center text-center'>
          <MintApp />
        </div>
      </div>
    </div>
  )
}