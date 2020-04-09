import React,{ useState, Children } from 'react';
import logo from './logo.svg';
import './App.css';
import './Formik.css';
import { login ,logout,loggedIn } from './api';
import { BrowserRouter as Router, useHistory, Route, Switch, Link } from 'react-router-dom';
import {Home} from './components/Home';
import {Welcome} from './components/Welcome';
import Login from './components/Login'
import Users from './components/Users'
import useUser from './hooks/use-user'
import Registartion from './components/Registration'
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import FormikForm from './components/FormikForm';
import Error from './components/Error';


const NotFound = () => {
  return <h1>404 Page not found.</h1>
}

const WithAuth = ({ children }) => {
  let history = useHistory();
  const {isLogin} = useUser();
  
  React.useEffect(() => {
    if(!isLogin){
      history.push('/login')
    }
  }, [isLogin, history])
  
  return isLogin ? children : null
}

function App() {

  const vals = useUser()
  const [userLoading, setUserLoading] = React.useState(true);
  const {isLogin,setUser,user,resetUser} = vals;
  
  const onLogout = () => {
    setUserLoading(true)
    logout(user.token).then((response) => {
      localStorage.removeItem('localToken');
      resetUser();
      setUserLoading(false)
    })
  }

  React.useEffect(() => {
    const token = localStorage.getItem('localToken');
    if(token){      
      // setUserLoading(true)
      setUser({
        name: 'hite',
        email: 'hite@admin.com',
        token
      })
      setUserLoading(false)
      loggedIn(token).then(res => res.json()).then((response) => {
        const {name,email} = response;
        setUser({
          name,
          email,
          token
        })
        setUserLoading(false)
      })
    }
    else {
      setUserLoading(false)
    }
  },[]);


  if(userLoading) {
    return <h1>Featching User..</h1>
  }

  return (
    <Router>
      <h1>{JSON.stringify(vals)}</h1>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/users/create">Create New User</Link>
            </li>
            { isLogin ? null :
            <li>
              <Link to="/registration">Reg</Link>
            </li>
            }
            <li>
              { isLogin ? (
                <button onClick={onLogout}>Logout</button>
              ) : ( <Link to="/login">Login</Link>)
              }
            </li>
          </ul>
        </nav>
      <Switch>
        <Route>
        <Route exact path="/" component={Home} />
        <Route exact path="/" component={(FormikForm)} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/welcome">
          <WithAuth>
            <Welcome name={user.name} />
          </WithAuth>
        </Route>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/users/create" component={CreateUser}/>
        <Route path="/users/create/edit/:id" component={EditUser}/>
        <Route path="/registration" component={Registartion}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
