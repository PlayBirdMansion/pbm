import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Banner } from '../components/Banner'
import { Footer } from '../components/Footer'
// import { Header } from '../components/Header'
import { Welcome } from '../components/Welcome'
import dynamic from 'next/dynamic'
import { Slider } from '../components/Slider'
// import { MintApp } from '../components/MintApp'
import { MintBanner } from '../components/MintBanner'
import { Roadmap } from '../components/Roadmap'
import { Referral } from '../components/Referral'
import { Team } from '../components/Team'
import { Perks } from '../components/Perks'
import banner_outside from '../public/banner.png'
import banner_inside from '../public/banner2.png'

const Header = dynamic(() =>
  import('../components/Header').then(mod => mod.Header),
  { ssr: false }
)

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Play Bird Mansion 🎉</title>
        <meta name="description" content="The Play Bird Mansion NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='sticky top-0 z-50 h-0'>
        <Header />
      </div>

      <div className='relative'>

        <Banner image={banner_outside} />

        <Welcome />
        <Slider />
        <MintBanner />
        <Banner image={banner_inside} />
        {/* <MintApp /> */}
        <div id='roadmapScroll'><Roadmap /></div>
        <Perks />
        <Referral />
        <div id='teamScroll'><Team /></div>

        <Footer />
      </div>
    </>
  )
}

export default Home
