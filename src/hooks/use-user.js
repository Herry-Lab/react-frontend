import { useContext } from 'react';
import UserContext from './../context/user-contex' 

const useUser = () => {
  const values = useContext(UserContext);
  return values
}

export default useUser;