import React, { Component } from 'react';
import {BrowserRouter,Switch,Route,Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Auth from './components/Pages/Auth'

import * as AuthActions from './store/actions/authActions'

import "bootstrap/dist/css/bootstrap.min.css"
import "./assests/swag.css"


import * as ChatActions from './store/actions/chatActions'
import Messenger from './components/Pages/Messenger';

class App extends Component{
  componentDidMount(){
    this.props.setupSocket(this.props.token, this.props.user.id);
  }

  render(){
    return(
      <div className="App">
       <button className="logout" onClick={e=>{
        this.props.logout();
        }}>logout</button> 
      <BrowserRouter>
          <Switch>

          <Route
               path="/login"
               render={props=>{
                if(this.props.token){
                  return(
                    <Redirect to ='/'/>
                  )
                }
                else{
                  return(
                    <Auth/>
                  )
                }
                
             }}
            
            />   
          <Route
               path="/signup"
               render={props=>{
                if(this.props.token){
                  return(
                    <Redirect to ='/'/>
                  )
                }
                else{
                  return(
                    <Auth/>
                  )
                }
                
             }}
            
            />    

          
            <Route
               path="/:threadId"
               render={props=>{
                  if(!this.props.token){
                    return(
                      <Redirect to ='/login'/>
                    )
                  }
                  else{
                    return(
                      <Messenger/>
                    )
                  }
                  
               }}
            
            />
              
             <Route
               path="/"
               render={props=>{
                  if(!this.props.token){
                    return(
                      <Redirect to ='/login'/>
                    )
                  }
                  else{
                    return(
                      <Messenger/>
                    )
                  }
                  
               }}
            
            />

          
          
          
          </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  ...state.auth,
  ...state.chat
})

const mapDispatchToProps= dispatch=>({
        setupSocket:(token,userId)=>{
          dispatch(ChatActions.setupSocket(token,userId));
        },
        logout:() =>{
          dispatch(AuthActions.logout());
        }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
