import React, { useState } from 'react'
import { MintModal } from './MintModal';

interface MintButtonProps {
  title: string
  style: string
}

export const MintButton: React.FC<MintButtonProps> = ({ title, style }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <a href='https://opensea.io/collection/playbirdmansion' target='_blank' rel="noreferrer">
      <button className={style}
         // onClick={() => {
        //   setModalOpen(true);
        //   }}>
      >
        Buy on OpenSea
      </button>
      {/* {modalOpen && <MintModal setOpenModal={setModalOpen} />} */}
    </a>
  )
}
