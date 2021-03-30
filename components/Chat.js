import React from 'react'
import styled from 'styled-components'
import {Avatar, IconButton,Button} from "@material-ui/core"
import getRecipientEmail from '../utilis/getRecipientEmail'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth,db} from '../firebase'
import {useCollection} from 'react-firebase-hooks/firestore'
import {useRouter} from 'next/router'

export default function Chat({id,users}) {
    const [user]= useAuthState(auth)
    const router= useRouter()
    const [recipientSnapshot] = useCollection(db.collection("users").where("email","==",getRecipientEmail(users,user))
     )

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users,user)
   console.log(recipient)
   console.log(recipientSnapshot)

    const enterChat =()=>{
        console.log(recipientEmail)
        console.log("id",id)
        router.push(`/chat/${id}`)
    }
   // console.log("id",id)
    return (
        <Container onClick={enterChat}>
            {recipient ? (<UserAvatar src= {recipient?.photoURL}/>) : (
              <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            
           <p>{recipientEmail}</p> 
   
        </Container>
    )
}

const Container = styled.div`
display:flex;
cursor: pointer;
align-items: center;
padding:15px;
word-break: break-word;


:hover{
    background-color:#e9eaeb
}


 
`
const UserAvatar = styled(Avatar)`
margin:5px;
margin-right:15px;

`