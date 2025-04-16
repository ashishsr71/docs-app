


import { useEffect, useState,useRef } from "react";
import Modal from "./Modal";
import useAuthStore from "../../store/useAuth";
import axios from "axios";

import { Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle, } from "./Dialog";
import { PencilIcon } from "lucide-react";

type handleClickprops={
  orgId:string,
  name:string
}


const DropdownUsers = () => {

const [isOpen,setIsOpen]=useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
 const [open,setModalOpen]=useState(false);
const [urs,setUsers]=useState<any[]>([]);
const {token,userId,setCurrentRole,}=useAuthStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [op,setOp]=useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [role,setRole]=useState("user role")
  


	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			const newEmail = input.trim().replace(/,$/, "");
			if (newEmail && !emails.includes(newEmail)) {
				setEmails([...emails, newEmail]);
			}
			setInput("");
		}
	};

	const removeEmail = (emailToRemove: string) => {
		setEmails(emails.filter(email => email !== emailToRemove));
	};

useEffect(()=>{
    const fetchRoles=async()=>{
        if(!token)return;
        const {data}=await axios.get(`${import.meta.env.VITE_API}/api/v1/org/get-docs`,{headers:{
            access_token:token
        }});
        // console.log(data)
    setUsers(data);
    };
   fetchRoles();

},[]);

// useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOp(false)
//         // setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);


const handleClick=async({orgId,name}:handleClickprops)=>{
if(!(emails.length>0)) return;
const {data}=await axios.post(`${import.meta.env.VITE_API}/api/v1/org/send-invite`,{orgId,name,emails},
  {headers:{
  access_token:token},
  withCredentials:true})
console.log(data);
setOp(false);

};
  return (
    <div className="relative inline-block">
      <button
        id="dropdownUsersButton"
        onClick={toggleDropdown}
        type="button"
        className="text-white bg-neutral-300 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      {role}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
   <Modal open={open} setOpen={setModalOpen}/>
      {isOpen && (
        <div
        ref={dropdownRef}
          id="dropdownUsers"
          className="z-10 mt-2 bg-white rounded-lg shadow-sm w-60 dark:bg-gray-700 absolute"
        >
          <ul
            className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUsersButton"
          >
            {urs.map((user, idx) => (
              <li key={idx}>
          {user.name&&user._id&& <Dialog open={op} onOpenChange={()=>{setOp(!op)}} >
      {/* <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Open Dialog
        </button>
      </DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User to {user.name}</DialogTitle>
        </DialogHeader>
       

        <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded px-2 py-2 max-h-32 overflow-y-auto mb-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
        {emails.map((email) => (
          <div
            key={email}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm "
          >
            <span>{email}</span>
            <button
              onClick={() => removeEmail(email)}
              className="text-blue-500 hover:text-red-600 font-bold"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

        <input
      type="text"
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type email and press Enter or ,"
      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    />
   
        <DialogFooter>
          <button className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
          <button
          onClick={()=>{handleClick({orgId:user._id,name:user.name})}}
          className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
            Add
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>   }              
           
       
                <a
               onClick={()=>{
                setCurrentRole(user?.name?user._id:user.userId);
               setRole(user?.name?`${user.name.trim(3)}`:"User")
                // setIsOpen(false);
               }}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor:pointer"
                >
                  {/* <img
                    className="w-6 h-6 me-2 rounded-full"
                    src={user.img}
                    alt={`${user.name} image`}
                  /> */}
              {user?._id!==userId&&!user.userId&& <button className="mr-2  P-[10px] cursor-pointer"
                onClick={()=>{setOp(!op)}}
                >
                  <PencilIcon className="size-4"/>
                  </button>}
               <span className="cursor-pointer"> {user.name?user.name:user?.email}</span> 
                </a>
              </li>
            ))}
          </ul>
          <a
            onClick={()=>{setModalOpen(!open)}}
            className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
            </svg>
            Add new Organization
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownUsers;
