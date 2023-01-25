
import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "./views/Login.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const App = () => {

    const [login, setLogin] = useState(false)
    let [registerData,setRegisterData] = useState({});

    let [register,setRegister] = useState(false)

    const loginUser = (username,password) =>{
        console.log(username,password)
          const auth = getAuth();
          signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log(user)
              localStorage.setItem('admin-login', JSON.stringify({user:user}));
              setLogin(true)
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if(error.code =="auth/wrong-password"){
                alert("Invalid credentials")
              }else if(error.code=="auth/user-not-found"){
                alert("No user exist")
              }
            });
    }

    const registerUser=()=>{

        console.log("RegisterUser",registerData)

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
          .then((userCredential) => {
            setRegisterData({})
            setRegister(false)
            const user = userCredential.user;
            console.log(userCredential)
            alert("User Created Successfuly")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(error.code =="auth/email-already-in-use"){
              alert("Email already in use")
            }
            console.log(error.code)
          });
    }


    const logoutUser = () => {
        console.log("hello")
        localStorage.clear()
        setLogin(false)
      }
    
    



    useEffect(()=>{
        console.log("App")
        if(JSON.parse(localStorage.getItem("admin-login")) !== null ){
            setLogin(true)
        }else{
            setLogin(false)
        }
    })




    return ( <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
      {(login && JSON.parse(localStorage.getItem("admin-login")) !== null ) ?
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} logoutUser={logoutUser} />} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    :    
    <Switch>
    <Route path="/login" render={()=> <Login registerData={registerData} setRegisterData={setRegisterData} register={register} setRegister={setRegister} registerUser={registerUser} loginUser={loginUser}/> } />
    <Redirect from="/" to="/login" />
  </Switch>

    }
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>

    )
};

export default App