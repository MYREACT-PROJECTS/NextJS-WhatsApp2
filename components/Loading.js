import React from 'react'
import {circle } from 'better-react-spinkit'
import Circle from 'better-react-spinkit/dist/Circle'

export default function Loading() {
    return (
        <center style ={{display:"grid",placeItmes:"center", height:"100vh"}}>
        <div>
          <img
          src="https://st2.depositphotos.com/1116329/7584/v/600/depositphotos_75840613-stock-illustration-vector-modern-phone-icon-in.jpg"
          alt=""
          style={{marginBottom:10}}
          height={200}
          />  
          <Circle color="#3cbc28" size={60}/>
        </div>
        </center>
    )
}
