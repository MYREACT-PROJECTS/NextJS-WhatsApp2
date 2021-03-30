import React from 'react'
import styled from 'styled-components'
import {Avatar, IconButton,Button} from "@material-ui/core"
import ChatIcon from '@material-ui/icons/Chat'
import { MoreVertTwoTone, SearchOutlined } from '@material-ui/icons'
import * as EmailValidator from  "email-validator"
import {auth, db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from '../components/Chat'


export default function Sidebar() {
    const [user,loading]= useAuthState(auth)
     
  const userChatRef = db.collection("chats").where('users','array-contains',user.email)

    const [chatSnapshot] = useCollection(userChatRef)
    const signOut =()=>{
      auth.signOut()
  }

  const createChat =()=>{
    const input = prompt("please enter an email address for user you whist to talk with ")
    if(!input) return null
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){
        //we need to add to chat  to db collectio
        db.collection("chats").add({
            users:[user.email,input]

        })
    }
}

const chatAlreadyExists = (recipientEmail) => 
   !!chatSnapshot?.docs.find((chat)=>chat.data()?.users.find((user)=>user===recipientEmail)?.length>=0
   
   ) 

   



    return (
        <Container >
            <Header>
                <UserAvatar
                onClick={signOut}
                src= {user.photoURL}/>
                <IconContainer>
                    <IconButton>
                    <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertTwoTone/>
                    </IconButton>
                    
                </IconContainer>
            </Header>
            <Search>
              <SearchOutlined/>
              <SearchInput
              placeholder="SEARCH IN CHAT"/>
            </Search>
            <SidebarButton onClick={createChat}>Start A NEW CHAT </SidebarButton>
            {chatSnapshot?.docs.map((chat)=>(

                <Chat key ={chat.id} id ={chat.id} users={chat.data().users}/>


            ))} 

           
        
        </Container>
    )
}
const SidebarButton = styled(Button)`
width:100%;
&&&{
border-bottom:1px solid  whitesmoke;
border-top:1px solid whitesmoke;

}


`
const SearchInput = styled.input`
outline-width:0;
border:none;
flex:1;
`
const Search = styled.div`
display:flex;
align-items:center;
padding:20px;
border-radius:2px;
`
const Container = styled.div`
flex:0.45;
border-right:1px solid whitesmoke;
height:100vh;
min-width:300px;
max-width:350px;

overflow-y:scroll;
::-webkit-scrollbar{
    display:none;

}
-ms-overflow-style:none;
scrollbar-width:none;
 
    

`
const UserAvatar = styled(Avatar)`
cursor: pointer;
margin-left:10px;

:hover{
    opacity:0.8;
}
`
const Header = styled.div`
display:flex;
position:sticky;
top: 0;
background-color:white;
z-index:100;
justify-content:space-between;
align-items:center;
height:80px;
border-bottom:1px solid whitesmoke;


`
const IconContainer= styled.div``

