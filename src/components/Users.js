import React from 'react'
import { Link } from 'react-router-dom';

import useApi from './../hooks/use-api'
import { deleteUser } from '../api';



const Users = () => {

  const [allData,setAllData] = React.useState([])
  const { allUser } = useApi();
  const [loading,setLoading] = React.useState(false)
    

      React.useEffect(() => {
        setLoading(true);
          allUser().then((res) => res.json()).then((response) => {
            console.log(response)
            const users = response.map((item)=>({id:item._id,name:item.name,email:item.email}))
          setAllData(users)
          setLoading(false);
        })
      },[])

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
    return(
    <h1>Loading.....</h1>
    )
  }

  return(
    <center>
    <h1>Welcome to Users Page.</h1>
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
        <td><Link to={`/users/create/edit/${user.id}`} >EDIT</Link></td>
        <td><button type="button" onClick={()=>{onDelete(user.id)}}>DELETE</button></td>
      </tr>
      ) 
      :null
    }
    </tbody>
    </table>
    </center>
  )
}

export default Users;