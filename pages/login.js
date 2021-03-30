import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import {auth,provider} from '../firebase'


export default function login() {
       
   const signIn =()=>{
       auth.signInWithPopup(provider).catch(alert)
   }
    return (
        <Container>
        <Head>
        <title>LOGIN</title>
        </Head>
        <LoginConatainer>
        <Logo src="https://st2.depositphotos.com/1116329/7330/v/600/depositphotos_73305633-stock-illustration-vector-modern-phone-icon-in.jpg"/>
        <Button onClick={signIn}
        variant="outlined">Sign In with Google</Button>
        </LoginConatainer>
         
        </Container>
    )
}


const Container = styled.div`

display:grid;
place-items:center;
height: 100vh;
background-color:whitesmoke;


 

`
const LoginConatainer  = styled.div`
display:flex;
flex-direction:column;
align-items:center;
padding:100px;
background-color:white;
border-radius:5px;
box-shadow:0px 4px 14px -3px rgba(0, 0, 0, 0.7)


`
const Logo  = styled.img`
height:200px;
width:200px;
margin-bottom:50px;

`