import React, {Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import Message from './Message'

class ThreadView extends Component{

    componentDidMount(){
        this.init();
        console.log("mount");
    }

    componentDidUpdate(props){
        
        if (props.match.params.threadId !== this.props.match.params.threadId){
           this.init();
         }
    }

    init=()=>{
        
        let currentThread= this.props.threads.filter(t => t.id === this.props.match.params.threadId)[0];
        if(currentThread && this.props.socket.readyState){
            let skip = currentThread.Messages || 0;
            this.props.socket.send(JSON.stringify({
                type: 'THREAD_LOAD',
                data: {
                    threadId: this.props.match.params.threadId,
                    skip:skip
                }
            }))
        
     
     }


    }

    render(){
      
        return(
            <div className="main-view">
                {this.props.threads.filter(thread => thread.id === this.props.match.params.threadId).map((thread,i)=>{
                    return (
                        <div className="message-container" key={i}>
                        { 
                             thread.Messages.filter(msg=> msg!= null).map((msg,mi)=>{
                            return(
                                <Message msg = {msg} key={mi}/>
                            )
                        })

                        }

                        
                        </div>
                    )
                })}
           
            </div>

        )
    }
}

const mapStateToProps= (state) =>({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps=(dispatch) =>({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ThreadView))