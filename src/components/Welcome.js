import React from 'react';

import useApi from './../hooks/use-api'
import {  useHistory,Link } from 'react-router-dom';
import { register, deleteUser } from '../api';

export const Welcome = ({name}) => {
  const [state, setState] = React.useState({name:'',email:'',password:''})
  const [allData,setAllData] = React.useState([])
  const { allUser } = useApi();

    const [loading,setLoading] = React.useState(false)
    const history = useHistory();


      const handleChange = (e) => {
          const {name, value} = e.target;
            setState(prevState =>({
              ...prevState,
              [name] : value
            }))
      }

      React.useEffect(() => {
        setLoading(true);
          allUser().then((res) => res.json()).then((response) => {
            console.log(response)
            const users = response.map((item)=>({id:item._id,name:item.name,email:item.email}))
          setAllData(users)
          setLoading(false);
        })
      },[])


      const onSubmit = (event) => {
          event.preventDefault();
          setLoading(true);
          register(state.name,state.email,state.password).then((res) => res.json()).then((response) => {
            console.log(response)
            setAllData((oldData) => {
              const newState = oldData.concat([{
                id:response.user._id,
                name:response.user.name,
                email:response.user.email
              }])
              return newState
            })
            setLoading(false);
          })

      }
      
      const onDelete = (id) => {
        setLoading(true);
          deleteUser(id).then((res) => res.json()).then((response) => {
            console.log(response)
            setAllData((oldData) => {
              const newState = oldData.filter( item => item.id !== id)
              return newState
            })
            setLoading(false);
          })
      }






    if(loading) {
      return <h1>Loading ...</h1>
    }
    return( <>    
            <h1>Welcome using props {name}</h1>
            
            <div className='App'>
              <form onSubmit={onSubmit} >
                <label>NAME:</label>
                <input value={state.name} type='text' name='name' onChange={handleChange} autoComplete='off'/><br/>
                <label>EMAIL:</label>
                <input value={state.email} type='text' name='email' onChange={handleChange} autoComplete='off'/><br/>
                <label>PASSWORD:</label>
                <input value={state.password} type='password' name='password' onChange={handleChange} autoComplete='off' /><br/>
                <button type='submit' >Insert</button>
              </form>
              </div>
              <h1>list of all user</h1>
              <table>
                <thead>
                  <tr>
              <th>Sr.no</th>
              <th>NAME</th>
              <th>EMAIL</th>
              </tr>
              </thead>
              <tbody>
              { 
                allData.length ?
                allData.map((user,index) => 
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><button type="button">EDIT</button></td>
                  <td><button type="button" onClick={()=>{onDelete(user.id)}}>DELETE</button></td>
                </tr>
                ) 
                :null
              }
              </tbody>
              </table>
            
            </>
    )
  }