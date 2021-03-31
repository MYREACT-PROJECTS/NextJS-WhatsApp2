import React, { useEffect } from 'react'
import styled from 'styled-components'
import {auth, db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MicNoneOutlined, MoreVertTwoTone } from '@material-ui/icons'
import { useCollection } from 'react-firebase-hooks/firestore'
 import {useState} from 'react'
 import firebase from 'firebase'
 import Message from './Message'
 import getRecipientEmail from '../utilis/getRecipientEmail'
 import TimeAgo from 'timeago-react'
 import {useRef} from 'react'



 export default function ChatScreen({chat,messages}) {
     const [input,setInput]= useState("");
     const [user] =useAuthState(auth)
    const router= useRouter()
    const reE= getRecipientEmail(chat.users,user)
    const endOfMessageRef= useRef(null)

   const [recipientSnapshot]= useCollection(db.collection("users").where('email','==',reE))
   const recipient = recipientSnapshot?.docs?.[0]?.data();
   const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc"))
    const showMessages =()=> {
      if (messagesSnapshot){
          return messagesSnapshot.docs.map(message=>(
            <Message
            key={message.id}    
            user={message.data().user}
            message={{
                ...message.data(),
                timestamp: message.data().timestamp?.toDate().getTime()
            }}
            />

          ) )
      }
      else{
          return JSON.parse(messages).map(message=>(
              <Message
              key={message.id}
              user={message.user}
              message={message}/>
          ))
      }

    }

  const ScrollToBottom=()=>{
      endOfMessageRef.current.scrollIntoView({
          behavior:"smooth",
          block:"start",
      })
  }
const sendMessage=(e)=>{
    e.preventDefault()
    db.collection("users").doc(user.uid).set({
        lastSeen:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true})

    db.collection("chats").doc(router.query.id).collection("messages").add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        message:input,
        user:user.email,
        photoURL:user.photoURL,
    })

    setInput("")
    ScrollToBottom()

}
  console.log("reipient",recipient)
  console.log("reipientshot",recipientSnapshot)
  console.log("chat",chat)
  console.log("messages",messages)
  console.log("email",reE)
  
  useEffect(() => {
    ScrollToBottom()

   }, [])
 

    return (
        <Container>
            <Header>
                {
                    recipient ? (
                        <UserAvatar src={recipient.photoURL}/>
                    ) :(
                        <UserAvatar>{reE[0]}</UserAvatar>     
                    )
                }
                <HeaderInformation>
                    <h3>{reE}</h3>
                    {user ?(
                         <p>
                             last active : {''}
                    {recipient?.lastSeen?.toDate()?
                    (<TimeAgo datetime={recipient?.lastSeen?.toDate()}/>)
                    : "UNAVAILABLE" }
                     </p>
                     ):(<p>"UNAVAILABLE"</p> )  }
                   

                </HeaderInformation>
                <HeaderIcon>
                    <IconButton>
                    <AttachFile/>
                    </IconButton>
                    <IconButton>
                    <MoreVertTwoTone/>
                    </IconButton>
                </HeaderIcon>

            </Header>
           
            <MessageConatiner>
              {showMessages()}
               <EndOfMessage ref= {endOfMessageRef}/>
            </MessageConatiner>
            <InputConatiner>
            <InsertEmoticon/>
            <Input  
            value={input}
            onChange={e=>setInput(e.target.value)}/>
            <button hidden disabled={!input} type="submit"
            onClick={sendMessage}
            >
              
            </button>
            <MicNoneOutlined/>
            </InputConatiner>
        </Container>
    )
}

const Input= styled.input`
flex:1;
align-items:center;
position:sticky;
padding:20px;
bottom:0;
background-color:whitesmoke;
outline:0;
border:none;
border-radius:10px;
margin-left:15px;
margin-right:15px;


`
const InputConatiner = styled.form`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:white;
z-index:100;
`

const Header=styled.div`
position:sticky;
background-color:white;
z-index:100;
top:0;
display:flex;
height:80px;
align-items:center;
border-bottom:1px solid whitesmoke;
`

const Container = styled.div`


`
const HeaderInformation=styled.div`
margin-left:15px;
flex:1;

>h3{
    margin-bottom:3px;
}
>p{
    font-size:14px;
    color:gray;
}
`
const HeaderIcon=styled.div``

const MessageConatiner=styled.div`
background-color:#CACCCE;
min-height:90vh;
padding:30px;

 


`
const EndOfMessage =styled.div`
margin-bottom:70px;
`
const UserAvatar= styled(Avatar)`
margin-left:15px
`