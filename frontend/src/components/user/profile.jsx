import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../utils/alerts";
import { get, post } from "../../utils/axios";

export default function CreateTrivia({ setOpenProfile, Cats,setAddTrivia,que }) {
  let initial = {}
  let [data, setData] = useState({...initial})
  let [updatePass,setUpdatePass] = useState(false)
  
  
  const onSave = ()=>{
    let payload = {...data}
    post('/users/UpdateProfile',{...payload}).then((res)=>{
      if(res.success){
        console.log(res.data.Email,data.Email)
        console.log(res.data.Email==data.Email)
        if(res.data.Email != data.Email){
            post('/users/UpdateEmail',{Email:data.Email}).then((res)=>{

                notifySuccess(res.msg)
                setOpenProfile(false)
            })
        }else{
            notifySuccess(res.msg)
            setOpenProfile(false)
            
        }
      }else{
        notifyError(res.msg)
      }
    })
  }
  const getProfile = ()=>{
    get('/users/getProfile').then((res)=>{
        setData(res.data)
    })
  }
  let onchange =(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    getProfile()
  },[])
  return (
    <>
      <div
        id="login-popup"
        tabIndex={-1}
        className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={() => {
                setOpenProfile(false);
              }}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="#c6c7c7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  cliprule="evenodd"
                />
              </svg>
              <span className="sr-only">Close popup</span>
            </button>
            <div className="p-5">
              <h3 className="text-2xl mb-0.5 font-medium" />
              <p className="mb-4 text-sm font-normal text-gray-800" />
              <div className="text-center">
                <p className="mb-9 text-2xl font-semibold leading-5 text-slate-900">
                  {'Your Profile'}
                </p>
              </div>

              
              { 
              updatePass == true ? 
              <>
              <input
                name="currentPass"
                required=""
                className="block  mb-3 w-full rounded-lg border border-gray-300 px-3 py-1 shadow-sm outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-black focus:ring-offset-1"
                placeholder="current password"
                defaultValue=""
                type="password"
                value={data.question}
                onChange={(e)=>{
                    onchange(e)
                  }}
              />
              <input
                name="newPass"
                required=""
                type="password"
                className="block  mb-2 w-full rounded-lg border border-gray-300 px-3 py-1 shadow-sm outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-black focus:ring-offset-1"
                placeholder="new password"
                defaultValue=""
                value={data.question}
                onChange={(e)=>{
                  onchange(e)
                }}
              />
              
              <p onClick={()=>{
                //   setUpdatePass(true)
              }}  className="text-end cursor-pointer hover:underline  text-sm">forgot password?</p>
           
            
              

              <button
              onClick={onSave}
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-rose-600 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                {'Update' }
              </button>
              </>
              :
              <>
                <input
                  name="UserName"
                  required=""
                  className="block  mb-3 w-full rounded-lg border border-gray-300 px-3 py-1 shadow-sm outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-black focus:ring-offset-1"
                  placeholder="Username"
                  defaultValue=""
                  value={data.UserName}
                  onChange={(e)=>{
                    onchange(e)
                  }}
                />
                <input
                  name="Email"
                  required=""
                  className="block  mb-2 w-full rounded-lg border border-gray-300 px-3 py-1 shadow-sm outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-black focus:ring-offset-1"
                  placeholder="Email"
                  defaultValue=""
                  value={data.Email}
                  onChange={(e)=>{
                    onchange(e)
                  }}
                />
                
                <p onClick={()=>{
                    setData({})
                    setUpdatePass(true)
                }}  className="text-end cursor-pointer hover:underline  text-sm">change password?</p>
             
              
                

                <button
                onClick={onSave}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-rose-600 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  {'Update' }
                </button>
                </>
                

                }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
