import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuth';
import { useState } from 'react';
import { Loader } from 'lucide-react';


type FormValues={
    fullname:string,
  email:string,
  password:string,
}



const Signup = () => {
    const navigate=useNavigate();
  const [error,setError]=useState<null|string>(null);
    const {setUser,setLoading,loading}=useAuthStore();
  // console.log(token)
  
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const onSubmit:SubmitHandler<FormValues>=async(data)=>{
      try {
        setLoading(true)
        const {data:d}=await axios.post(`${import.meta.env.VITE_API}/api/v1/user/signup`,{
          email:data.email,
          password:data.password,
          fullname:data.fullname
        },{withCredentials:true});
  setUser(d.access_token,d.userId);
        navigate("/");
      } catch (error:any) {
        setError(error.response.data.msg??"something went wrong");
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
     
  return (
  <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
    <a href="#">
      <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
            />
          </svg>
        </div>
        Signup in Docs
      </div>
    </a>
    <div className="relative mt-12 w-full max-w-lg sm:mt-10">
      <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
      <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
        <div className="flex flex-col p-6">
          <h3 className="text-xl font-semibold leading-6 tracking-tighter">Signup</h3>
          <p className="mt-1.5 text-sm font-medium text-white/50">
            Welcome back, enter your credentials to continue.
          </p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label htmlFor="email" className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Email

                  </label>
               { !errors.email?.message&&  <div className="absolute right-3 translate-y-2 text-green-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>}
                </div>
                <input
                  type="email"
                  placeholder="email"
                 id='email'
                  autoComplete="off"
                  className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                {...register("email",{required:"email is required"})}
                />
                
              </div>
              {errors.email && <p role="alert " className='text-red-400'>{errors.email?.message}</p>}
            </div>

            <div className='mt-4'>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label htmlFor="fullname" className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Full name
                  </label>
               { !errors.fullname?.message&&  <div className="absolute right-3 translate-y-2 text-green-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>}
                </div>
                <input
                  type="text"
                  placeholder="name"
                 id='fullname'
                  autoComplete="off"
                  className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                {...register("fullname",{required:"name is required"})}
                />
                
              </div>
              {errors.fullname && <p role="alert " className='text-red-400'>{errors.fullname?.message}</p>}
            </div>
            <div className="mt-4">
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label htmlFor='password' className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Password
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="password"
                    id='password'
                     className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                  {...register("password",{required:"Enter password"})}
                  />
                </div>
              </div>
              {errors.password && <p role="alert" className='text-red-400'>{errors.password?.message}</p>}
            </div>
          
            <div className="mt-4 flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  
                  className="cursor-pointer outline-none focus:outline focus:outline-sky-300"
                />
                <span className="text-xs">Remember me</span>
              </label>
              <a className="text-sm font-medium text-foreground underline" href="/forgot-password">
                Forgot password?
              </a>
            </div>
            <div className="mt-4 flex items-center justify-end gap-x-2">
              <Link
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                to="/register"
              >
                Login
              </Link>
              <button
                type="submit"
                className="cursor-pointer font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
              >
                
                {loading?<Loader/>:"SignUp"}
              </button>
            </div>
            {error&&<span className='text-red-500'>{error}</span>}
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}


export default Signup;