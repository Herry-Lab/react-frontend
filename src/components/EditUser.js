import React, { useState } from 'react'
import { useParams, useHistory } from "react-router-dom";


import useApi from './../hooks/use-api'



const EditUser = () => {
  const [state,setState] = useState({name:'',email:''})
  const [loading,setLoading] = React.useState(false)
  const { findUser,updateUser } = useApi()
  const history = useHistory()
  let {id} = useParams()

  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      let response = await findUser(id)
      response = await response.json()
      const {name,email} = response;
      setState({
        name,
        email
      })
      setLoading(false);
    }
    fetchUser();    
  },[])

  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    const values = { 
      id,
      name: state.name,
      email: state.email
    }
    updateUser(values).then((res) => res.json()).then((response) => {
      history.push('/users')
    })
  }, [state.name, state.email])

  const handleChange = React.useCallback((e) => {
    const {name, value} = e.target;
      setState(prevState =>({
        ...prevState,
        [name] : value
    }))
  }, [])

  return(   
    <div className='App'>
      <form onSubmit={!loading ? onSubmit : () => {}} >
        <label>NAME:</label>
        <input value={state.name} type='text' name='name' onChange={handleChange} autoComplete='off'/><br/>
        <label>EMAIL:</label>
        <input value={state.email} type='text' name='email' onChange={handleChange} autoComplete='off'/><br/>
        <button type='submit' >{ !loading ? 'Update' : 'Updating....'}</button>
      </form>
    </div>
  )
}

export default EditUser;