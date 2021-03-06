import Head from 'next/head'
import styles from '../styles/Home.module.css'

import HeaderComponent from '../components/HeaderComponent'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderComponent>
        <div>Some random content inside.</div>
        <div>Some more random content inside.</div>
        <div>Even some more random content inside.</div>
      </HeaderComponent>
    </div>
  )
}
