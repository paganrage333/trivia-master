import React, { useEffect } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { post } from '../../utils/axios';
import Cookies from 'universal-cookie';
import { notifyError, notifySuccess } from '../../utils/alerts';
const Login = ({isLogin}) => {
    let cookie = new Cookies()
    let navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const AuthFuncation = (data)=>{
        
        
            let form = {...data}
            if(isLogin){

                delete data?.UserName
            }
            post(`/auth/${isLogin ? 'login':"register"}`,{...form}).then((res)=>{
                if(res.success){
                    notifySuccess(res.msg)
                    if(isLogin){
                            cookie.set('token',res.token)
                            navigate('/dashboard')    
                    }
                }else{
                        notifyError(res.msg)
                }
            })
        
    }
    useEffect(()=>{
        if(cookie.get('token')){
            notifyError('already logged in')
            navigate('/dashboard')
        }
    },[])
  return (
    <div className="min-h-[95vh]  bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        
        <div className=" flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Sign {isLogin ? 'in':'up'}</h1>
          <div className="w-full flex-1 mt-8">
           
            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or sign up with e-mail
              </div>
            </div>
            <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit((data)=>{AuthFuncation(data)})}>
              {
                isLogin ? "":
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                {...register('UserName',{required: true})}
                placeholder="Full Name"
              />
              
              }
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="email"
                {...register('Email',{required: true})}
                placeholder="Email"
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                {...register('Password',{required: true})}
                placeholder="Password"
              />
              <button 
              type='submit'
            //   onClick={()=>{handleSubmit((data)=>{console.log(data)})}}
              className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              {isLogin ? '':
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy={7} r={4} />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                }
                <span className="ml-3">Sign {isLogin ? 'in':'up'}</span>
              </button>
              </form>
              {
                isLogin ? 
                <>
                  <p className='text-sm text-center mt-2'>or</p>
                  <Link to="/signup">
              <p  className='text-center mt-2 text-indigo-500 hover:underline cursor-pointer '>Create new Account</p>
                  </Link>
                </>:
                <>
                 <p className='text-sm text-center mt-2'>or already have account want</p>
                 <Link to="/signin">
                 <p   className='text-center mt-1 text-indigo-500 hover:underline cursor-pointer '>login</p>
                 </Link>
                </>

              }
              <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by templatana's
                <Link href="#" className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </Link>
                and its
                <Link href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
          }}
        ></div>
      </div>
    </div>
  </div>
  )
}
export default Login
