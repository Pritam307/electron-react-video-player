import React,{ useRef,useContext,useEffect,useState} from 'react';
import { SocketContext } from './SocketContext';
import { useHistory } from 'react-router';

const LandingPage = () => {

    const socket = useContext(SocketContext);

    const createBtnRef = useRef();
    const joinBtnRef = useRef();
    const history = useHistory();


    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        socket.on("GROUP_ACK",(data)=>{
            console.log("data:",data);
            if(data.status === "success"){
                localStorage.setItem("USERID",data.userId)
                setRedirect(true);
                
            }
        })
    },[socket])


    useEffect(()=>{
        if(redirect){
            history.push({
                pathname:"/video"
            })
        }
    },[redirect])


    const handleCreateGroup=()=>{
        if(createBtnRef.current.value){
            socket.emit("GROUP_CREATE",{
                name:createBtnRef.current.value,
                admin:true, 
            })
        }
    }


    const handleJoinGroup=()=>{
        if(joinBtnRef.current.value){

            console.log("join:",joinBtnRef.current.value);
            socket.emit("GROUP_JOIN",{
                name:joinBtnRef.current.value,
                admin:false, 
            })
        }
    }

    return (
        <div className="container-fluid border border-dark p-5">
            <div className="col-12 m-5 p-5">
                <div className="row">
                    <div className="col-8">
                        <div className="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">Create Group</span>
                            <input type="text" ref={createBtnRef} class="form-control" aria-label="Username" 
                            placeholder="Enter Group Name" aria-describedby="addon-wrapping"/>
                        </div>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary" onClick={handleCreateGroup}> Create</button>
                    </div>
                </div>


                <p className="h3 text-center my-3">OR</p>

                <div className="row">
                    <div className="col-8">
                        <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">Join Group</span>
                            <input type="text" ref={joinBtnRef} class="form-control" placeholder="Enter Group " 
                            aria-label="Username" aria-describedby="addon-wrapping"/>
                        </div>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary" onClick={handleJoinGroup}>Join</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default LandingPage;