import React from 'react'
import { MenuDropdown } from './MenuDropdown';
import { MenuItem } from './MenuItem'

interface MenuProps {

}

export const Menu: React.FC<MenuProps> = ({}) => {
  const executeScroll = (x) => document.getElementById(x).scrollIntoView();
 
  return (
    <div className='flex flex-row cursor-pointer'>
       {/* <div onClick={() => executeScroll('roadmapScroll')}><MenuItem title={'ROADMAP'} /></div>
      <div onClick={() => executeScroll('teamScroll')}><MenuItem title={'TEAM'} /></div> */}
      <MenuDropdown title={'COMMUNITY'} style={''} />
    </div>
  )
}
