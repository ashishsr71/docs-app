import { ClientSideSuspense, } from "@liveblocks/react";
import { useSelf ,useOthers} from "@liveblocks/react/suspense";
import Separator from "./Seperator";
import { Avatar } from "./ui/Avatar";




const Users = () => {
    const users=useOthers();
    const currentUser=useSelf();

// if(users.length===0)return null;


  return (
    <div 
    className="flex items-center">
    {currentUser&&(
        <div className="relative ml-2">
            <Avatar alt="you"  src={currentUser.info?.avatar} t={false} fallbackText={"you"}/>

        </div>
    )}
    <div className="flex ">
        {users.length>0&&users.map(({connectionId,info})=>{
            return(
                <Avatar src={info?.imgUrl?.toString()} alt={info?.fullname?.toString()} key={connectionId} t={false} fallbackText={info?.fullname?.toString()}/>
            )
        })}
    </div>
    
    </div>
  )
}



const UserStack=()=>{
    return(
        <ClientSideSuspense fallback={null}>
            <Users/>
        </ClientSideSuspense>
    )
}


export default UserStack