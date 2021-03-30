import Head from 'next/head'
import Sidebar from "../components/Sidebar"
import styled from "styled-components"


export default function Home() {
  return (
    <Container>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     

     <Sidebar/>
      
     
    </Container>
  )
}

 const Container = styled.div``