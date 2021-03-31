import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Sidebar from '../'
import ChatScreen from '../../components/ChatScreen'
import {db,auth} from '../../firebase'
import getRecipientEmail from '../../utilis/getRecipientEmail'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from "next/router";

  function Chat({chat,messages}) {
    const router = useRouter();
    //const query = router.query; 
    const [user] = useAuthState(auth)
    const re= getRecipientEmail(chat.users,user)
    return (
        <Container>
            <Head>
            <title>Chat with </title>
      
            </Head> 
            <Sidebar/>
            <ChatContainer>
                <ChatScreen 
                chat={chat}
                messages={messages}
                />
            </ChatContainer>
        </Container>
    )
}

export default Chat;

export async function getServerSideProps (context){
  //const path= context.router
  //console.log(path)

 const ref = db.collection("chats").doc(context.query.id);
 const messgaesRes = await ref.collection('messages').orderBy("timestamp","asc").get()
  const messages = messgaesRes.docs.map(doc=>({
      id:doc.id,
      ...doc.data(),
  })).map(messages=>({
      ...messages,
      timestamp:messages.timestamp.toDate().getTime(),
  }))

  const chatRes = await ref.get();
  const chat= {
      id:chatRes.id,
      ...chatRes.data()
  }

  console.log("messages",messages) 
  return{
      props:{
          messages:JSON.stringify(messages),
          chat:chat,
      }
  }
}
const Container = styled.div`
display:flex;



`
const  ChatContainer = styled.div`
flex:1;

overflow:scroll;
height:100vh;
::-webkit-scrollbar{
    display:none;

}
-ms-overflow-style:none;
scrollbar-width:none;
 


`