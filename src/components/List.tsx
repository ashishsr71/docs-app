import { CircleUserIcon } from "lucide-react";
import useAuthStore from "../store/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const List = () => {
  const [list,setList]=useState<any[]>([]);
  const {token,currentRole,setCurrentRole}=useAuthStore();
  
  
  useEffect(()=>{
if(token){
axios.get(`${import.meta.env.VITE_API}/api/v1/user/alldocs?role=${currentRole}`,{headers:{
  access_token:token
}}).then(res=>{
  
  setList([...res.data.docs])
})
}

  },[token,currentRole])
  return (
    <div className="w-full h-full mt-10 ">
        <div className="mb-10 ">
            <table className=" table-auto w-full shadow-md mt-5 border-spacing-2 border-separate rounded pb-10">
            <thead className="bg-base-200 text-left text-gray-700  tracking-wider">
          <tr>
            <th className="pl-30 ">Name</th>
            <th className="pl-30">Shared</th>
            
            <th className="pl-30">Created At</th>
          </tr>
        </thead>
            <tbody >
                {list?.length>0&&list.map((item)=>(
                  <tr  
                  key={item._id} className="bg-card mt-6 rounded hover:bg-neutral-300 cursor-pointer">
                <td className="pl-30 pt-5 w-[80px] pb-4">
                    <Link  to={item._id}><div className="flex flex-wrap gap-x-1 "><CircleUserIcon/>
                   <span> {item?.title}</span></div></Link>
                    </td>
                    <td className="pl-30 pt-5 w-[80px] pb-4">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> {item.type?item.type:"Personal"}</span></div>
                    </td>
                    <td className="pl-30 pt-5 w-[80px] pb-4">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> {item.createdAt}</span></div>
                    </td>
                </tr>))}
                
               
            </tbody>
            
            </table>
        </div>
        
        </div>
  )
}

export default List;