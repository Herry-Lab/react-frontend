import React, {useEffect} from 'react'

import useUser from './../hooks/use-user';
import { register } from '../api';
import {  useHistory } from 'react-router-dom';

const Registartion = () => {
    const [state, setState] = React.useState({name:'',email:'',password:''})
    const {isLogin, setUser} = useUser();
    const [loading,setLoading] = React.useState(false)
    const history = useHistory();

    useEffect(() => {
      if(isLogin){
        history.push('/welcome')
      }
    }, [history,isLogin])


    const handleChange = (e) => {
        const {name, value} = e.target;
          setState(prevState =>({
            ...prevState,
            [name] : value
          }))
    }

      const onSubmit = (event) => {
          event.preventDefault();
          setLoading(true);
          register(state.name,state.email,state.password).then((res) => res.json()).then((response) => {
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
      

  return (
    <div className='App'>
      <form onSubmit={onSubmit} >
        <label>NAME:</label>
        <input value={state.name} type='text' name='name' onChange={handleChange}/><br/>
        <label>EMAIL:</label>
        <input value={state.email} type='text' name='email' onChange={handleChange} /><br/>
        <label>PASSWORD:</label>
        <input value={state.password} type='password' name='password' onChange={handleChange}/><br/>
        <button type='submit' >Register</button>
      </form>
    </div>
  )
}

export default Registartion;