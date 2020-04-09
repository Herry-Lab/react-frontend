import React from 'react';
import { useHistory } from "react-router-dom";


import { register } from '../api';


const CreateUser = () => {
  const [state, setState] = React.useState({name:'',email:'',password:''})
  const [uploadFile, setUploadFile] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const history = useHistory()
  const fileInput = React.createRef(); 
    
  const handleChange = (e) => {
    const {name,value} = e.target;
    setState(prevState =>({
      ...prevState,
      [name] : value,
    }))
  }

  const handleUpload = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setUploadFile(file)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: state.name,
      email: state.email,
      password: state.password,
      img: uploadFile,
    }
    register(data).then((res) => res.json()).then((response) => {
      // console.log(response);
      history.push('/users')
    })
  }
  
  if(loading) {
    return <h1>Loading ...</h1>
  }
  return( <>    
    <h1>Welcome using props</h1>
    
    <div className='App'>
      <form onSubmit={onSubmit} >
        <label>NAME:</label>
        <input value={state.name} type='text' name='name' onChange={handleChange} autoComplete='off'/><br/>
        <label>EMAIL:</label>
        <input value={state.email} type='text' name='email' onChange={handleChange} autoComplete='off'/><br/>
        <label>PASSWORD:</label>
        <input value={state.password} type='password' name='password' onChange={handleChange} autoComplete='off' /><br/>
        <label>File:</label>
        <input name='img' type="file" onChange={handleUpload} /><br/>
        <button type='submit' >Insert</button>
      </form>
      </div>
    </>
  )
}

export default CreateUser;