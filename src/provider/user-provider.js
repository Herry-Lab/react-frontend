import React, {useState,useEffect} from 'react';
import UserContext from './../context/user-contex'


const initialState = {name : '' ,email:'',token:''}

const UserProvider = ({ children }) => {
  const [user,setUser] = useState(initialState)
  const [isLogin,setIsLogin] = useState(false);
  const resetUser = () => {
    setUser(initialState);
  }
  useEffect(() => {
    if(user.token !== ''){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
  }, [user])
  return <UserContext.Provider value={{
    user, 
    setUser,
    resetUser,
    isLogin,
  }}>
    {children}
  </UserContext.Provider>
}

export default UserProvider