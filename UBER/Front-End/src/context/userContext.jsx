import { useState,createContext } from 'react'

export const userDataContext = createContext();
 
const userContext = ({children}) => {
 const [user, setuser] = useState({
     email:'',
    fullname:{
      firstname:'',
      lastname:''
    }
  })
  return (
    <div>
      <userDataContext.Provider value={{user,setuser}}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default userContext
