
import Logo from '../assets/logo.svg'
import { useState, useRef, useEffect } from "react";
import DropdownUsers from './ui/DropDownUsers';
import { Avatar } from './ui/Avatar';
import a from '../assets/a.png'
import useAuthStore from '../store/useAuth';
import axios from 'axios';


type DropdownProps={
  trigger:string;
  w:string;

}

const Dropdown = ({trigger,w}:DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const[content,setContent]=useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
  <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="w-[150px] text-white cursor-pointer bg-neutral-400 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
     style={{width:w}}
     >
       {trigger}
        <svg
          className="w-2.5 h-2.5 ml-3"
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

      {isOpen && trigger=="Personal"&& (
        <div className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          
            <li> 
              <button
                onClick={()=>{}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-17 "
              >
               Create
              </button>
            </li>
          </ul>
        </div>
      )}
       {isOpen && trigger=="User"&& (
        <div className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li> */}
            <li>
              <button
                onClick={()=>{}}
                className=" px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};


const Navigation = () => {
  const {token}=useAuthStore();
  const [inivtes,setInvites]=useState<any[]>([]);
useEffect(()=>{
const fetchInvites=async()=>{
  const {data}=await axios.get(`${import.meta.env.VITE_API}/api/v1/org/all-invites`,{headers:{
    access_token:token
  }});
  console.log(data)
  setInvites(data);
}
fetchInvites();
},[])

const joinOrganization=async(id:string|undefined)=>{
  console.log(id)
  const {data}=await axios.post(`${import.meta.env.VITE_API}/api/v1/org/join`,{orgId:id},{
    headers:{
      access_token:token
    }
  });
  console.log(data);
}

  return (
    <div className='w-full h-full flex justify-between'>
        <div className='flex items-center'>
        <img src={Logo} alt='logo' style={{width:36,height:36}}/>
        <span>Docs</span>
        </div>
        <div className=''>
        <div className='flex gap-x-2 items-center flex-wrap '>
          <Avatar src={a} notificationList={inivtes} cb={joinOrganization} />
        <DropdownUsers />
        <div
        className=' rounded-lg pr-3 mr-4 cursor-pointer'
        style={{alignSelf:"center"}}>
          <Dropdown trigger='User' w='60px'/>
        </div> 
        </div>
        </div>
    </div>
  )
}

export default Navigation;