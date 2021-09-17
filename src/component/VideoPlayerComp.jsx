import React, {useState ,useEffect,useRef,useContext} from 'react';
import PlyrComponent from 'plyr-react'
import { SocketContext } from './SocketContext';
// import Plyr from 'react-plyr';

const VideoPlayerComp = (props) => {

    const socket = useContext(SocketContext);

    const [videoFilePath,setVideoFilePath]=useState('');
    const [socketId,setSocketId] = useState(null);

    const plyrRef = useRef();
    const handleFileSelect=(event)=>{
        setVideoFilePath(URL.createObjectURL(event.target.files[0]));
        console.log("socketId:",socketId);
        if(socketId){
            socket.emit("VIDEO_SELETED",{
                msg:true
            })
        }
    };

    useEffect(()=>{
    
        // socket.emit("USER ONLINE",{msg:"hello"});
        socket.on("USER_CONNECTED",(data)=>{
            console.log("socketId:",data);
            setSocketId(data.socketId)
        })
        
        console.log(plyrRef.current.plyr)
    },[socket])

    // socket.on("connect_error", () => {
    //       // revert to classic upgrade 
    //     socket.io.opts.transports = ["polling", "websocket"];
    // });





    const videoSrc = {
        type: "video",
        title: 'Example title',
        sources: [
            {
                src: videoFilePath,
                type: 'video/mp4',
            }
        ]
    };

    return (
        <div className="col-12   mt-4">
                <input type="file" onChange={(e)=>handleFileSelect(e)} id="formFile"/>
                <PlyrComponent 
                    ref={plyrRef}
                    source={videoSrc}
                />
                <button className="btn btn-primary" onClick={()=>plyrRef.current.plyr.play()}>Play</button>
        
        </div>
    );
};

export default VideoPlayerComp;