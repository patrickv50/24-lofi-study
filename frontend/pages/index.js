import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Player from '../components/Player'
import styles from '../styles/Home.module.css'


export default function Home() {


  return (
    <div style={{}}>
      <Head>
        <title>Study lo fi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
          <Player />
      </main>






    </div>
  )
}
