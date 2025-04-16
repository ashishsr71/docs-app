import { create } from "zustand";

interface IAuth{
    userId:string|null;
    loading:boolean;
    token:string|null;
    currentRole:string|null;
    setLoading:(loading:boolean)=>void;
    setUser:(token:string|null,userId:string|null)=>void;
    setCurrentRole:(role:string|null)=>void;
};


 const useAuthStore=create<IAuth>((set)=>({
    setUser:(token,userId)=>set({userId,token}),
    setLoading:(loading)=>set({loading}),
    setCurrentRole:(currentRole)=>set({currentRole}),
    token:null,
    userId:null,
    loading:false,
    currentRole:null
}));

export default useAuthStore;