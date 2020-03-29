

export const login = (email, password) => {
  const body = { 
    email,
    password
  }
  return fetch('http://localhost:3000/users/login', {
    method: 'post',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const logout = (token) => {
  return fetch('http://localhost:3000/users/me/logout', {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
  })
}


export const loggedIn = (token) => {
  return fetch('http://localhost:3000/users/me/', {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
  })
}