import { createContext,useEffect,useState } from "react";
import { useAuth } from "./AuthProvider";
import { Children } from "react";
import io from "socket.io-client";
import { useContext } from "react";
export const useSocketContext=()=>{
    return useContext(socketContext);
}
const socketContext=createContext();
export const SocketProvider=({children})=>{
    const[socket,setSocket]=useState(null);
    const[authUser]=useAuth();
    const[onlineUser,setOnlineUser]=useState([]);

    useEffect(()=>{
        if(authUser){
            const socket=io("https://chat-application-j0m9.onrender.com",{
                query:{
                    userId
: authUser.user._id,                },
            });
            setSocket(socket);
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUser(users);
            });
            return()=>socket.close();
        } else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);
    return (
<socketContext.Provider value={{socket,onlineUser}}>
    {children}
</socketContext.Provider>
    );
};