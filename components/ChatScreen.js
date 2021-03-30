import React from 'react'
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



 export default function ChatScreen({chat,messages}) {
     const [input,setInput]= useState("");
     const [user] =useAuthState(auth)
    const router= useRouter()
   const recipientSnapshot= useCollection(db.collection("users").where('email','==',getRecipientEmail(chat.users,user)))
   const recipient = recipientSnapshot?.docs?.[0].data()
   const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc"))
  const reE= getRecipientEmail(chat.users,user)
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

}
  
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
                    {recipientSnapshot ?(
                         <p>
                             last active : {''}
                    {recipient?.lastSeen?.toDate() }
                     </p>
                     )
                                
                    :(<p>"ünavilable"</p> )  }
                   

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
              {showMessages}
               <EndOfMessage/>
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
background-color:whitesmoke;
min-height:90vh;
padding:30px;

 


`
const EndOfMessage =styled.div`
z-index:-1;`
const UserAvatar= styled(Avatar)`
margin-left:15px
`