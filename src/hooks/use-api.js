import React from 'react' 
import { useContext } from 'react';
import useUser from './use-user';

const useApi = () => {
  const endPoint = 'http://localhost:3000'
  const { user : { token }} = useUser()

  const allUser = React.useCallback(() => {
    return fetch(`${endPoint}/users/all`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    })
  }, [token])

  const findUser = React.useCallback((id) => {
    return fetch(`${endPoint}/users/find/${id}`, {
      method: 'get',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    })
  }, [token])

  const updateUser = React.useCallback(({ id, ...rest}) => {
    return fetch(`${endPoint}/users/update/${id}`, {
      method: 'post',
      body: JSON.stringify(rest),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    })
  }, [token])

  return {
    allUser,
    findUser,
    updateUser
  }
}

export default useApi;