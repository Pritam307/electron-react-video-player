import React,{useRef,useContext} from 'react';
import { SocketContext } from './SocketContext';

const LandingPage = () => {

    const createBtnRef = useRef();
    const joinBtnRef = useRef();
    const socket = useContext(SocketContext);


    const handleCreateGroup=()=>{
        if(createBtnRef.current.value){
            console.log(createBtnRef.current.value);
            socket.emit("GROUP_CREATE",{
                name:createBtnRef.current.value,
                admin:true
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
                        <button className="btn btn-primary">Join</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default LandingPage;