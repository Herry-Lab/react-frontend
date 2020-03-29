import React,{Suspense,lazy} from 'react';
import logo from './logo.svg';
import './App.css';
import { login ,logout,loggedIn } from './api';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import {Home} from './routers/Home';
// import {Welcome} from './routers/Welcome';



// const Hardik = ({ username, password}) => {
//   return (
//     <h1>hardik</h1>
//   )
// }
const initialState = {name : '' ,email:'',token:''}




function App() {

  // const [ counter, setCounter ] = React.useState(0)
  // const test = function() {
  //  setCounter((oldState) => oldState + 1)
  // }
  const [user,setUser] = React.useState(initialState)
 
  React.useEffect(() => {
    const token = localStorage.getItem('localToken');
    if(token){
      
      setLoading(true)
      loggedIn(token).then(res => res.json()).then((response) => {
        const {name,email} = response;
        setUser({
          name,
          email,
          token
        })
        setLoading(false)
      })
    }
  },[]);

  const [loading,setLoading] = React.useState(false)
  const onSubmit = (email, password) =>{
    setLoading(true);
    login(email, password).then(res => res.json()).then((response) => {
      // console.log(response.user.name,"<===>",response.user.password,"<===>",response.token)
      const {user:{name,email},token} = response;
      // localStorage.setItem('localName',name);
      localStorage.setItem('localToken',token);  
      setUser({
        name,
        email,
        token,
      })
      setLoading(false);
    })
    
  }
  const onLogout = () => {
    setLoading(true)
    // localStorage.removeItem('localName');
    
    // localStorage.clear();
    logout(user.token).then((response) => {
      setUser(initialState);
      localStorage.removeItem('localToken');
      setLoading(false);
    })
  }
  
  

 /* React.useEffect(() => {
    console.log(state.user)
    console.log(state.password)
  }, [state])*/
 



  if(loading){
    return(
      <h1>Loading....</h1>
    )
  }
 
  return (
    
    // <Router>
    //     <Suspense fallback={<div>Loading...</div>}>
  
    //     {/* <Route exact path="/Home" component={Home}/> */}
    //     <Route path="/" component={Welcome}/>
  
    //   {/* </Switch> */}
    // </Suspense>






    user.name !== '' ?

     (<>
      <Welcome name={user.name}/>
      <Logout onLogout={onLogout}/>
      </> 
     )
     :(<Login 
        onSubmit={onSubmit} 
      />)
    
  )
}

const Login = ({onSubmit}) => {
  const [state, setState] = React.useState({email:'hite@admin.com',password:'abc'})
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
    onSubmit(state.email, state.password);
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


const Welcome = ({name}) => {
  return(     
           <h1>Welcome {name}</h1>
  )
}
const Logout = ({onLogout}) => {

        

    return(
      <div>
        <button type="button" onClick={onLogout}>Logout</button>
      </div>
    )

}
export default App;
