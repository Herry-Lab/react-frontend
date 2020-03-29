import React,{useEffect} from 'react'

import useUser from './../hooks/use-user';
import { login } from './../api';
import {  useHistory } from 'react-router-dom';

const Login = () => {
  const {isLogin, setUser} = useUser();
  const history = useHistory();
  const [loading,setLoading] = React.useState(false)
  const [state, setState] = React.useState({email:'hite@admin.com',password:'abc'})

  useEffect(() => {
    if(isLogin){
      history.push('/welcome')
    }
  }, [history,isLogin])
  
  const handleChange = e => {
    // e.preventDefault();
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    setLoading(true);
    login(state.email, state.password).then(res => res.json()).then((response) => {
      const {user:{name,email},token} = response;
      localStorage.setItem('localToken',token);  
      setUser({
          name,
          email,
          token,
      })
      setLoading(false);
    })
  }

  if(loading) {
    return <h1>Loading ...</h1>
  }

  if(isLogin){
    return null;
  }

  return(
    <div className="App">
      <form onSubmit={handleSubmit}>
          <input value={state.email} type="text" name="email" onChange={handleChange}/><br/>
          <input value={state.password} type="password" name="password" onChange={handleChange }/><br/>
          <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Login;