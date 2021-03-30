const getRecipientEmail = (users,userLoggedIn)=>
users.filter((userFilter)=>userFilter !== userLoggedIn.email)[0]
export default getRecipientEmail