import React from 'react';

import useUser from './../hooks/use-user'



export const Welcome = ({name}) => {

  const {user} = useUser();
 
    return( <>    
            <h1>Welcome using props {name}</h1>
            <h1>Welcome using hook {user.email}</h1>
            </>
    )
  }