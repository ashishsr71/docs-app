import Editor from "../components/Editor"
import Navbar from "../components/Navbar"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

import Toolbar from "../components/Toolbar"
import { useParams } from "react-router-dom";
import useAuthStore from "../store/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";


function Document() {
  const {id}=useParams();
  
const {token,userId:uId,currentRole}=useAuthStore();
const [users,setUsers]=useState<any[]>([]);
const [loading,setLoading]=useState(false)
const organization=currentRole!==uId;
const [initialContent,setInitialContent]=useState<string>("");
useEffect(()=>{
  const fetchUsers=async()=>{
    setLoading(true)
  const {data}=await axios.get(`${import.meta.env.VITE_API}/api/v1/org/getusers/${currentRole}`,{headers:{
    access_token:token,
    },
  withCredentials:true
  });
 
  setUsers([...data]);
  setLoading(false);
  }
 
if(organization){
  fetchUsers();
}

if(loading){
  setLoading(false);
}

},[currentRole]);


useEffect(()=>{
  const getIntialContent=async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API}/api/v1/user/getcontent/${id}`,{
      headers:{
        access_token:token
      },
    withCredentials:true});
setInitialContent(data.content);
   console.log(data.content);

  };


  getIntialContent();
},[token,id])




if(loading){
  return <div>....loading</div>
}

  return (
    <>
      <LiveblocksProvider
      // resolveUsers={({userIds})=>{
      //   // console.log( userIds.map((userId)=>users.find(user=>user.userId==userId)??undefined))
      //   return userIds.map((userId)=>users.find(user=>user.userId==userId)??undefined)
      // }} 
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) => {
          const user = users.find((user) => user.userId === userId);
          if (!user) return undefined;
      
          return {
            id: user.userId,
            name: user.fullname,
            avatar: user.imgUrl || undefined,
          };
        });
      }}
      resolveMentionSuggestions={({text})=>{
        // console.log(text)
        let filteredUsers=users;
       
        if(text){
          filteredUsers=users.filter((user)=>
        
             user.fullname.includes(text.toLowerCase()))
        
        }
        console.log(filteredUsers.map((user)=>user.userId))
        return filteredUsers.map((user)=>user.fullname)
      }}
       authEndpoint={async (room) => {
        const url = `${import.meta.env.VITE_API}/api/v1/liveblocks-auth/${id}`;

const response = await axios.post(
  url,
  { room },
  {
    headers: {
      access_token: `${token}`,
      "Content-Type": "application/json",
    },
    withCredentials:true
  }
  
);


return response.data;
      }}
      
      throttle={16}
      >
      <RoomProvider id={`${id}`} initialStorage={{leftMargin:56,rightMargin:56}}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
        {/* <ClientSideSuspense fallback={<div>Loading…</div>}> */}
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden h-[112px]">
          <Navbar /> 
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={initialContent}/>
        </div>
      </div>
    {/* </ClientSideSuspense> */}
      </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
     </>
  )
}

export default Document